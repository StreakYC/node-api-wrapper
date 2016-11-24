/* @flow */

import https from 'https';
import querystring from 'querystring';

import aeu from './auto-encode-uri';

class ConnHelper {
  _authKey: string;

  constructor(authKey: string) {
    this._authKey = authKey;
  }

  _getRequestOptions(method: string, path: string, headers: Object={}, encoding: ?string='utf8'): Object {
    // By default we request the V1 of the API
    let prefix = '/api/v1/';

    // If the requested resource is a Task, then use the V2 of the API
    if (path.indexOf('tasks') > -1) prefix = '/api/v2';

    return {
      method, headers, encoding,
      host: 'mailfoogae.appspot.com',
      path: prefix + path,
      auth: this._authKey
    };
  }

  _parseResponse(response: https.IncomingMessage): Promise {
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

  _plainResponse(response: https.IncomingMessage): Promise<Buffer> {
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

  get(path: string): Promise {
    return new Promise((resolve, reject) => {
      const opts = this._getRequestOptions('GET', path);
      const request = https.request(opts, res => {
        resolve(this._parseResponse(res));
      });
      request.on('error', reject);
      request.end();
    });
  }

  getNoParse(path: string): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      const opts = this._getRequestOptions('GET', path, undefined, null);
      const request = https.request(opts, res => {
        resolve(this._plainResponse(res));
      });
      request.on('error', reject);
      request.end();
    });
  }

  put(path: string, data: Object): Promise<Object> {
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

  delete(path: string): Promise {
    return new Promise((resolve, reject) => {
      const opts = this._getRequestOptions('DELETE', path);
      const request = https.request(opts, res => {
        resolve(this._parseResponse(res));
      });
      request.on('error', reject);
      request.end();
    });
  }

  post(path: string, data: any): Promise<Object> {
    return new Promise((resolve, reject) => {
      const send = querystring.stringify({json:JSON.stringify(data)});
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
  constructor(s: Streak, c: ConnHelper) {
    this._s = s;
    this._c = c;
  }
  get() {
    return this._c.get('users/me');
  }
}

class Pipelines {
  _s: Streak;
  _c: ConnHelper;
  Stages: PipelineStages;
  Fields: PipelineFields;
  constructor(s: Streak, c: ConnHelper) {
    this._s = s;
    this._c = c;
    this.Stages = new PipelineStages(s, c);
    this.Fields = new PipelineFields(s, c);
  }
  getAll() {
    return this._c.get('pipelines');
  }
  getOne(key: string) {
    return this._c.get(aeu `pipelines/${key}`);
  }
  getBoxes(key: string) {
    return this._c.get(aeu `pipelines/${key}/boxes`);
  }
  getBoxesInStage (key: string, stageKey: string) {
    return this._c.get(aeu `pipelines/${key}/boxes?stageKey=${stageKey}`);
  }
  create(data: Object) {
    return this._c.put('pipelines', data);
  }
  delete(key: string) {
    return this._c.delete(aeu `pipelines/${key}`);
  }
  update(data: Object) {
    return this._c.post(aeu `pipelines/${data.key}`, data);
  }
  getFeed(key: string, detailLevel: ?string) {
    let qs = '';
    if (detailLevel) {
      qs += '?' + querystring.stringify({detailLevel});
    }
    return this._c.get(aeu `pipelines/${key}/newsfeed` + qs);
  }
}

class PipelineStages {
  _s: Streak;
  _c: ConnHelper;
  constructor(s: Streak, c: ConnHelper) {
    this._s = s;
    this._c = c;
  }
  getAll(pipeKey: string) {
    return this._c.get(aeu `pipelines/${pipeKey}/stages`);
  }
  getOne(pipeKey: string, key: string) {
    return this._c.get(aeu `pipelines/${pipeKey}/stages/${key}`);
  }
  create(pipeKey: string, data: Object) {
    return this._c.put(aeu `pipelines/${pipeKey}/stages`, data);
  }
  delete(pipeKey: string, key: string) {
    return this._c.delete(aeu `pipelines/${pipeKey}/stages/${key}`);
  }
  update(pipeKey: string, data: Object) {
    return this._c.post(aeu `pipelines/${pipeKey}/stages/${data.key}`, data);
  }
}

class PipelineFields {
  _s: Streak;
  _c: ConnHelper;
  constructor(s: Streak, c: ConnHelper) {
    this._s = s;
    this._c = c;
  }
  getAll(pipeKey: string) {
    return this._c.get(aeu `pipelines/${pipeKey}/fields`);
  }
  getOne(pipeKey: string, key: string) {
    return this._c.get(aeu `pipelines/${pipeKey}/fields/${key}`);
  }
  create(pipeKey: string, data: Object) {
    return this._c.put(aeu `pipelines/${pipeKey}/fields`, data);
  }
  delete(pipeKey: string, key: string) {
    return this._c.delete(aeu `pipelines/${pipeKey}/fields/${key}`);
  }
  update(pipeKey: string, data: Object) {
    return this._c.post(aeu `pipelines/${pipeKey}/fields/${data.key}`, data);
  }
}

class Boxes {
  _s: Streak;
  _c: ConnHelper;
  Fields: BoxFields;
  constructor(s: Streak, c: ConnHelper) {
    this._s = s;
    this._c = c;
    this.Fields = new BoxFields(s, c);
  }
  getAll() {
    return this._c.get('boxes');
  }
  getForPipeline(key: string) {
    return this._s.Pipelines.getBoxes(key);
  }
  getOne(key: string) {
    return this._c.get(aeu `boxes/${key}`);
  }
  create(pipeKey, data) {
    return this._c.put(aeu `pipelines/${pipeKey}/boxes`, data);
  }
  delete(key: string) {
    return this._c.delete(aeu `boxes/${key}`);
  }
  update(data: Object) {
    return this._c.post(aeu `boxes/${data.key}`, data);
  }
  getFields(key: string) {
    return this._c.get(aeu `boxes/${key}/fields`);
  }
  getReminders(key: string) {
    return this._c.get(aeu `boxes/${key}/reminders`);
  }
  getComments(key: string) {
    return this._c.get(aeu `boxes/${key}/comments`);
  }
  // deprecated method
  createComment(key: string, data) {
    return this._c.put(aeu `boxes/${key}/comments`, data);
  }
  postComment(key: string, message: string) {
    return this._c.put(aeu `boxes/${key}/comments`, {message});
  }
  getFiles(key: string) {
    return this._c.get(aeu `boxes/${key}/files`);
  }
  getThreads(key: string) {
    return this._c.get(aeu `boxes/${key}/threads`);
  }
  getFeed(key: string, detailLevel: ?string) {
    let qs = '';
    if (detailLevel) {
      qs += '?' + querystring.stringify({detailLevel});
    }
    return this._c.get(aeu `boxes/${key}/newsfeed` + qs);
  }
  getTasks(key: string) {
    return this._c.get(aeu `boxes/${key}/tasks`);
  }
}

class BoxFields {
  _s: Streak;
  _c: ConnHelper;
  constructor(s: Streak, c: ConnHelper) {
    this._s = s;
    this._c = c;
  }
  getForBox(key: string) {
    return this._s.Boxes.getFields(key);
  }
  getOne(boxKey: string, key: string) {
    return this._c.get(aeu `boxes/${boxKey}/fields/${key}`);
  }
  update(boxKey: string, data: Object) {
    return this._c.post(aeu `boxes/${boxKey}/fields/${data.key}`, data);
  }
}

class Files {
  _s: Streak;
  _c: ConnHelper;
  constructor(s: Streak, c: ConnHelper) {
    this._s = s;
    this._c = c;
  }
  getForBox(key: string) {
    return this._s.Boxes.getFiles(key);
  }
  getOne(key: string) {
    return this._c.get(aeu `files/${key}`);
  }
  getContents(key: string) {
    return this._c.getNoParse(aeu `files/${key}/contents`);
  }
}

class Threads {
  _s: Streak;
  _c: ConnHelper;
  constructor(s: Streak, c: ConnHelper) {
    this._s = s;
    this._c = c;
  }
  getForBox(boxKey: string) {
    return this._s.Boxes.getThreads(boxKey);
  }
  getOne(threadKey: string) {
    return this._c.get(aeu `threads/${threadKey}`);
  }
}

class Tasks {
  _s: Streak;
  _c: ConnHelper;
  constructor(s: Streak, c: ConnHelper) {
    this._s = s;
    this._c = c;
  }
  getOne(key: string) {
    return this._c.get(aeu `tasks/${key}`);
  }
  create(boxKey: string, data: Object) {
    return this._c.post(aeu `boxes/${pipeKey}/tasks`, data);
  }
  update(key: string, data: Object) {
    return this._c.post(aeu `tasks/${key}`, data);
  }
  delete(key: string) {
    return this._c.delete(aeu `tasks/${key}`);
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

  constructor(authKey: string) {
    this._c = new ConnHelper(authKey);
    this.Me = new Me(this, this._c);
    this.Pipelines = new Pipelines(this, this._c);
    this.Boxes = new Boxes(this, this._c);
    this.Files = new Files(this, this._c);
    this.Threads = new Threads(this, this._c);
    this.Tasks = new Tasks(this, this._c);
  }

  search(query: string): Promise {
    return this._c.get(aeu `search?query=${query}`);
  }
}
