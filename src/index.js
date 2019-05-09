/* @flow */

import https from 'https';
import querystring from 'querystring';

import aeu from './auto-encode-uri';

class ConnHelper {
  _authKey: string;

  constructor (authKey: string) {
    this._authKey = authKey;
  }

  _getRequestOptions (method: string, path: string, headers: Object = {}, encoding: ?string = 'utf8'): Object {
    let prefix = '/api';
    return {
      method, headers, encoding,
      host: 'www.streak.com',
      path: prefix + path,
      auth: this._authKey
    };
  }

  _parseResponse (response: https.IncomingMessage): Promise<any> {
    return new Promise((resolve, reject) => {
      const strs: string[] = [];
      response.on('data', (chunk: string) => {
        strs.push(chunk);
      });
      response.on('end', () => {
        try {
          const str = strs.join('');
          if (response.statusCode === 200) {
            resolve(JSON.parse(str));
          } else {
            let json;
            let errorMessage = `Response code ${response.statusCode}`;
            try {
              json = JSON.parse(str);
              if (json && json.error) {
                errorMessage = json.error;
              }
            } catch (err) {
              // Ignore parse error
            }
            reject(Object.assign((new Error(errorMessage): Object), {
              str, json,
              statusCode: response.statusCode,
              headers: response.headers
            }));
          }
        } catch (err) {
          reject(err);
        }
      });
      response.on('error', reject);
    });
  }

  _plainResponse (response: https.IncomingMessage): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      const chunks: Buffer[] = [];
      response.on('data', (chunk: Buffer) => {
        chunks.push(chunk);
      });
      response.on('end', () => {
        try {
          const buf = Buffer.concat(chunks);
          if (response.statusCode === 200) {
            resolve(buf);
          } else {
            const errorMessage = `Response code ${response.statusCode}`;
            reject(Object.assign((new Error(errorMessage): Object), {
              buf,
              statusCode: response.statusCode,
              headers: response.headers
            }));
          }
        } catch (err) {
          reject(err);
        }
      });
      response.on('error', reject);
    });
  }

  get (path: string): Promise<Object> {
    return new Promise((resolve, reject) => {
      const opts = this._getRequestOptions('GET', path);
      const request = https.request(opts, res => {
        resolve(this._parseResponse(res));
      });
      request.on('error', reject);
      request.end();
    });
  }

  getNoParse (path: string): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      const opts = this._getRequestOptions('GET', path, undefined, null);
      const request = https.request(opts, res => {
        resolve(this._plainResponse(res));
      });
      request.on('error', reject);
      request.end();
    });
  }

  put (path: string, data: Object): Promise<Object> {
    return new Promise((resolve, reject) => {
      const dstr = querystring.stringify(data);
      const opts = this._getRequestOptions('PUT', path + '?' + dstr);
      const request = https.request(opts, res => {
        resolve(this._parseResponse(res));
      });
      request.on('error', reject);
      request.end();
    });
  }

  delete (path: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const opts = this._getRequestOptions('DELETE', path);
      const request = https.request(opts, res => {
        resolve(this._parseResponse(res));
      });
      request.on('error', reject);
      request.end();
    });
  }

  post (path: string, data: any): Promise<Object> {
    return new Promise((resolve, reject) => {
      const send = querystring.stringify({ json: JSON.stringify(data) });
      const opts = this._getRequestOptions('POST', path, {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': send.length
      });
      const request = https.request(opts, res => {
        resolve(this._parseResponse(res));
      });
      request.write(send);
      request.on('error', reject);
      request.end();
    });
  }
}

class Me {
  _s: Streak;
  _c: ConnHelper;

  constructor (s: Streak, c: ConnHelper) {
    this._s = s;
    this._c = c;
  }

  get () {
    return this._c.get('/v1/users/me');
  }
}

class Pipelines {
  _s: Streak;
  _c: ConnHelper;
  Stages: PipelineStages;
  Fields: PipelineFields;

  constructor (s: Streak, c: ConnHelper) {
    this._s = s;
    this._c = c;
    this.Stages = new PipelineStages(s, c);
    this.Fields = new PipelineFields(s, c);
  }

  getAll () {
    return this._c.get('/v1/pipelines');
  }

  getOne (key: string) {
    return this._c.get(aeu`/v1/pipelines/${key}`);
  }

  getBoxes (key: string) {
    return this._c.get(aeu`/v1/pipelines/${key}/boxes`);
  }

  getBoxesInStage (key: string, stageKey: string) {
    return this._c.get(aeu`/v1/pipelines/${key}/boxes?stageKey=${stageKey}`);
  }

  create (data: Object) {
    return this._c.put('/v1/pipelines', data);
  }

  delete (key: string) {
    return this._c.delete(aeu`/v1/pipelines/${key}`);
  }

  update (data: Object) {
    return this._c.post(aeu`/v1/pipelines/${data.key}`, data);
  }

  getFeed (key: string, detailLevel: ?string) {
    let qs = '';
    if (detailLevel) {
      qs += '?' + querystring.stringify({ detailLevel });
    }
    return this._c.get(aeu`/v1/pipelines/${key}/newsfeed` + qs);
  }
}

class PipelineStages {
  _s: Streak;
  _c: ConnHelper;

  constructor (s: Streak, c: ConnHelper) {
    this._s = s;
    this._c = c;
  }

  getAll (pipeKey: string) {
    return this._c.get(aeu`/v1/pipelines/${pipeKey}/stages`);
  }

  getOne (pipeKey: string, key: string) {
    return this._c.get(aeu`/v1/pipelines/${pipeKey}/stages/${key}`);
  }

  create (pipeKey: string, data: Object) {
    return this._c.put(aeu`/v1/pipelines/${pipeKey}/stages`, data);
  }

  delete (pipeKey: string, key: string) {
    return this._c.delete(aeu`/v1/pipelines/${pipeKey}/stages/${key}`);
  }

  update (pipeKey: string, data: Object) {
    return this._c.post(aeu`/v1/pipelines/${pipeKey}/stages/${data.key}`, data);
  }
}

class PipelineFields {
  _s: Streak;
  _c: ConnHelper;

  constructor (s: Streak, c: ConnHelper) {
    this._s = s;
    this._c = c;
  }

  getAll (pipeKey: string) {
    return this._c.get(aeu`/v1/pipelines/${pipeKey}/fields`);
  }

  getOne (pipeKey: string, key: string) {
    return this._c.get(aeu`/v1/pipelines/${pipeKey}/fields/${key}`);
  }

  create (pipeKey: string, data: Object) {
    return this._c.put(aeu`/v1/pipelines/${pipeKey}/fields`, data);
  }

  delete (pipeKey: string, key: string) {
    return this._c.delete(aeu`/v1/pipelines/${pipeKey}/fields/${key}`);
  }

  update (pipeKey: string, data: Object) {
    return this._c.post(aeu`/v1/pipelines/${pipeKey}/fields/${data.key}`, data);
  }
}

class Boxes {
  _s: Streak;
  _c: ConnHelper;
  Fields: BoxFields;

  constructor (s: Streak, c: ConnHelper) {
    this._s = s;
    this._c = c;
    this.Fields = new BoxFields(s, c);
  }

  getAll () {
    return this._c.get('/v1/boxes');
  }

  getForPipeline (key: string) {
    return this._s.Pipelines.getBoxes(key);
  }

  getOne (key: string) {
    return this._c.get(aeu`/v1/boxes/${key}`);
  }

  create (pipeKey, data) {
    return this._c.post(aeu`/v2/pipelines/${pipeKey}/boxes`, data);
  }

  delete (key: string) {
    return this._c.delete(aeu`/v1/boxes/${key}`);
  }

  update (data: Object) {
    return this._c.post(aeu`/v1/boxes/${data.key}`, data);
  }

  getFields (key: string) {
    return this._c.get(aeu`/v1/boxes/${key}/fields`);
  }

  getReminders (key: string) {
    return this._c.get(aeu`/v1/boxes/${key}/reminders`);
  }

  getComments (key: string) {
    return this._c.get(aeu`/v1/boxes/${key}/comments`);
  }

  // deprecated method
  createComment (key: string, data) {
    return this._c.put(aeu`/v1/boxes/${key}/comments`, data);
  }

  postComment (key: string, message: string) {
    return this._c.put(aeu`/v1/boxes/${key}/comments`, { message });
  }

  getFiles (key: string) {
    return this._c.get(aeu`/v1/boxes/${key}/files`);
  }

  getThreads (key: string) {
    return this._c.get(aeu`/v1/boxes/${key}/threads`);
  }

  getFeed (key: string, detailLevel: ?string) {
    let qs = '';
    if (detailLevel) {
      qs += '?' + querystring.stringify({ detailLevel });
    }
    return this._c.get(aeu`/v1/boxes/${key}/newsfeed` + qs);
  }

  getTasks (key: string) {
    return this._c.get(aeu`/v2/boxes/${key}/tasks`);
  }
}

class BoxFields {
  _s: Streak;
  _c: ConnHelper;

  constructor (s: Streak, c: ConnHelper) {
    this._s = s;
    this._c = c;
  }

  getForBox (key: string) {
    return this._s.Boxes.getFields(key);
  }

  getOne (boxKey: string, key: string) {
    return this._c.get(aeu`/v1/boxes/${boxKey}/fields/${key}`);
  }

  update (boxKey: string, data: Object) {
    return this._c.post(aeu`/v1/boxes/${boxKey}/fields/${data.key}`, data);
  }
}

class Files {
  _s: Streak;
  _c: ConnHelper;

  constructor (s: Streak, c: ConnHelper) {
    this._s = s;
    this._c = c;
  }

  getForBox (key: string) {
    return this._s.Boxes.getFiles(key);
  }

  getOne (key: string) {
    return this._c.get(aeu`/v1/files/${key}`);
  }

  getContents (key: string) {
    return this._c.getNoParse(aeu`/v1/files/${key}/contents`);
  }
}

class Threads {
  _s: Streak;
  _c: ConnHelper;

  constructor (s: Streak, c: ConnHelper) {
    this._s = s;
    this._c = c;
  }

  getForBox (boxKey: string) {
    return this._s.Boxes.getThreads(boxKey);
  }

  getOne (threadKey: string) {
    return this._c.get(aeu`/v1/threads/${threadKey}`);
  }
}

class Tasks {
  _s: Streak;
  _c: ConnHelper;

  constructor (s: Streak, c: ConnHelper) {
    this._s = s;
    this._c = c;
  }

  getForBox (boxKey: string) {
    return this._s.Boxes.getTasks(boxKey);
  }

  getOne (key: string) {
    return this._c.get(aeu`/v2/tasks/${key}`);
  }

  create (boxKey: string, data: Object) {
    return this._c.post(aeu`/v2/boxes/${boxKey}/tasks`, data);
  }

  update (key: string, data: Object) {
    return this._c.post(aeu`/v2/tasks/${key}`, data);
  }

  delete (key: string) {
    return this._c.delete(aeu`/v2/tasks/${key}`);
  }
}

class Webhooks {
  _s: Streak;
  _c: ConnHelper;

  constructor (s: Streak, c: ConnHelper) {
    this._s = s;
    this._c = c;
  }

  /**
   * Get all webhooks for a pipeline
   *
   * @param key Pipeline key
   * @return {Promise.<Object>}
   */
  getForPipeline (key: string) {
    return this._c.get(aeu`/v2/pipelines/${key}/webhooks`);
  }

  /**
   * Get a specific webhook
   *
   * @param key Webhook key
   * @return {Promise.<Object>}
   */
  getOne (key: string) {
    return this._c.get(aeu`/v2/webhooks/${key}`);
  }

  /**
   * Create a new webhook for pipeline
   *
   * @param key Pipeline key
   * @param data
   * @return {Promise.<Object>}
   */
  create (key: string, data: Object) {
    return this._c.post(aeu`/v2/pipelines/${key}/webhooks`, data);
  }

  /**
   * Delete a webhook
   *
   * @param key Webhook key
   * @return {Promise.<Object>}
   */
  delete (key: string) {
    return this._c.delete(aeu`/v2/webhooks/${key}`);
  }

  /**
   * Edit a webhook
   *
   * @param key Webhook key
   * @param data
   * @return {Promise.<Object>}
   */
  update (key: string, data: Object) {
    return this._c.post(aeu`/v2/webhooks/${key}`, data);
  }
}

class Teams {
  _s: Streak;
  _c: ConnHelper;

  constructor (s: Streak, c: ConnHelper) {
    this._s = s;
    this._c = c;
  }

  /**
   * Get list of my teams
   * @return {Promise<Object>}
   */
  getAll () {
    return this._c.get(aeu`/v2/users/me/teams`);
  }

  /**
   * Get a team
   *
   * @param key Team key
   * @return {Promise<Object>}
   */
  getOne (key: string) {
    return this._c.get(aeu`/v2/teams/${key}`);

  }
}

class Contacts {
  _s: Streak;
  _c: ConnHelper;

  constructor (s: Streak, c: ConnHelper) {
    this._s = s;
    this._c = c;
  }

  /**
   * Get a contact
   *
   * @param key
   * @return {Promise<Object>}
   */
  getOne (key: string) {
    return this._c.get(aeu`/v2/contacts/${key}`);
  }

  /**
   * Create a new contact
   *
   * @param key Team key
   * @param data
   * @return {Promise.<Object>}
   */
  create (key: string, data: Object) {
    return this._c.post(aeu`/v2/teams/${key}/contacts`, data);
  }

  /**
   * Edit a contact
   *
   * @param key Contact key
   * @param data
   * @return {Promise.<Object>}
   */
  update (key: string, data: Object) {
    return this._c.post(aeu`/v2/contacts/${key}`, data);
  }

  /**
   * Delete a contact
   *
   * @param key Contact key
   * @return {Promise.<Object>}
   */
  delete (key: string) {
    return this._c.delete(aeu`/v2/contacts/${key}`);
  }

  /**
   * Add contacts to box
   * @param key Box key to add contacts to
   * @param data Array with contacts. E.g {contacts:[{<a contact>}]}
   *
   * @return {Promise<Object>}
   */
  addToBox (key: string, data: Array) {
    return this._c.post(aeu`/v1/boxes/${key}`, data);
  }

}

export class Streak {
  _c: ConnHelper;
  Me: Me;
  Pipelines: Pipelines;
  Boxes: Boxes;
  Files: Files;
  Threads: Threads;
  Tasks: Tasks;
  Webhooks: Webhooks;
  Teams: Teams;
  Contacts: Contacts;

  constructor (authKey: string) {
    this._c = new ConnHelper(authKey);
    this.Me = new Me(this, this._c);
    this.Pipelines = new Pipelines(this, this._c);
    this.Boxes = new Boxes(this, this._c);
    this.Files = new Files(this, this._c);
    this.Threads = new Threads(this, this._c);
    this.Tasks = new Tasks(this, this._c);
    this.Webhooks = new Webhooks(this, this._c);
    this.Teams = new Teams(this, this._c);
    this.Contacts = new Contacts(this, this._c);

    // constants for webhook event types
    this.Webhooks.boxCreate = 'BOX_CREATE';
    this.Webhooks.boxDelete = 'BOX_DELETE';
    this.Webhooks.stageCreate = 'STAGE_CREATE';
    this.Webhooks.boxNewEmailAddress = 'BOX_NEW_EMAIL_ADDRESS';
    this.Webhooks.boxEdit = 'BOX_EDIT';
    this.Webhooks.boxChangeState = 'BOX_CHANGE_STAGE';
    this.Webhooks.boxChangePipeline = 'BOX_CHANGE_PIPELINE';
    this.Webhooks.commentCreate = 'COMMENT_CREATE';
    this.Webhooks.taskCreate = 'TASK_CREATE';
    this.Webhooks.taskComplete = 'TASK_COMPLETE';
    this.Webhooks.taskDue = 'TASK_DUE';
  }

  search (query: string): Promise<Object> {
    return this._c.get(aeu`/v1/search?query=${query}`);
  }
}
