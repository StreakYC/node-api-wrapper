/* @flow */
//jshint ignore:start

var https: any/* flow https defs seem broken */ = require('https');
var querystring = require('querystring');

class ConnHelper {
  _authKey: string;

  constructor(authKey: string) {
    this._authKey = authKey;
  }

  getRequestOptions(path: string): Object {
    return {
      host: 'mailfoogae.appspot.com',
      path: '/api/v1/' + path,
      auth: this._authKey
    };
  }

  requestCallback(cb: Function, errCb: Function, noParse: boolean=false): Function {
    return function(response) {
      var str = '';
      response.on('data', function(chunk) {
        str += chunk;
      });

      response.on('end', function() {
        try {
          if (response.statusCode === 200) {
            if (!noParse) {
              cb(JSON.parse(str));
            } else {
              cb(str);
            }
          } else {
            var json;
            var errorMessage = `Response code ${response.statusCode}`;
            if (!noParse) {
              try {
                json = JSON.parse(str);
                if (json && json.error) {
                  errorMessage = json.error;
                }
              } catch(err) {}
            }
            errCb(Object.assign((new Error(errorMessage): Object), {
              str, json,
              statusCode: response.statusCode,
              headers: response.headers
            }));
          }
        } catch(err) {
          errCb(err);
        }
      });

      response.on('error', function(error) {
        return errCb(error);
      })
    }
  }

  get(path: string, cb: Function, errCb: Function, noParse:boolean=false) {
    var opts = this.getRequestOptions(path);
    var request = https.request(opts, this.requestCallback(cb, errCb, noParse));
    request.on('error', errCb)
    request.end();
  }

  put(path: string, data: any, cb: Function, errCb: Function) {
    var dstr = querystring.stringify(data);
    var opts = this.getRequestOptions(path + "?" + dstr);
    opts.method = "PUT";

    var request = https.request(opts, this.requestCallback(cb, errCb));

    request.on('error', errCb)
    request.end();
  }

  delete(path: string, cb: Function, errCb: Function) {
    var opts = this.getRequestOptions(path);
    opts.method = "DELETE";
    var request = https.request(opts, this.requestCallback(cb, errCb));
    request.on('error', errCb)
    request.end();
  }

  post(path: string, data: any, cb: Function, errCb: Function) {
    var dstr = JSON.stringify(data);
    var opts = this.getRequestOptions(path);

    opts.method = "POST";
    opts.headers = {
      'Content-Type': 'application/json',
      'Content-Length': dstr.length
    }

    var request = https.request(opts, this.requestCallback(cb, errCb));

    request.write(dstr);
    request.on('error', errCb)
    request.end();
  }
}

class Me {
  _s: Streak;
  _c: ConnHelper;
  constructor(s: Streak, c: ConnHelper) {
    this._s = s;
    this._c = c;
  }
  get(cb, errCb) {
    this._c.get('users/me', cb, errCb);
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
  getAll(cb, errCb) {
    this._c.get('pipelines', cb, errCb);
  }
  getOne(key, cb, errCb) {
    this._c.get('pipelines/' + key, cb, errCb);
  }
  getBoxes(key, cb, errCb) {
    this._c.get('pipelines/' + key + '/boxes', cb, errCb);
  }
  getBoxesInStage (key, stageKey, cb, errCb) {
    this._c.get('pipelines/' + key + '/boxes?stageKey='+ encodeURIComponent(stageKey), cb, errCb);
  }
  create(data, cb, errCb) {
    this._c.put('pipelines', data, cb, errCb);
  }
  delete(key, cb, errCb) {
    this._c.delete('pipelines/' + key, cb, errCb);
  }
  update(data, cb, errCb) {
    this._c.post('pipelines/' + data.key, data, cb, errCb);
  }
  getFeed(key, detailLevel, cb, errCb) {
    var qs = "";
    if (detailLevel) {
      qs += '?' + querystring.stringify({detailLevel});
    }
    this._c.get('pipelines/' + key + '/newsfeed' + qs, cb, errCb);
  }
}

class PipelineStages {
  _s: Streak;
  _c: ConnHelper;
  constructor(s: Streak, c: ConnHelper) {
    this._s = s;
    this._c = c;
  }
  getAll(pipeKey: string, cb, errCb) {
    this._c.get('pipelines/'+pipeKey+'/stages', cb, errCb);
  }
  getOne(pipeKey: string, key: string, cb, errCb) {
    this._c.get('pipelines/'+pipeKey +'/stages/' + key, cb, errCb);
  }
  create(pipeKey: string, data: Object, cb, errCb) {
    this._c.put('pipelines/' + pipeKey + '/stages', data, cb, errCb);
  }
  delete(pipeKey: string, key: string, cb, errCb) {
    this._c.delete('pipelines/' +pipeKey +'/stages/' + key, cb, errCb);
  }
  update(pipeKey: string, data: Object, cb, errCb) {
    this._c.post('pipelines/' + pipeKey + '/stages/' + data.key, data, cb, errCb);
  }
}

class PipelineFields {
  _s: Streak;
  _c: ConnHelper;
  constructor(s: Streak, c: ConnHelper) {
    this._s = s;
    this._c = c;
  }
  getAll(pipeKey: string, cb, errCb) {
    this._c.get('pipelines/'+pipeKey+'/fields', cb, errCb);
  }
  getOne(pipeKey: string, key: string, cb, errCb) {
    this._c.get('pipelines/'+pipeKey +'/fields/' + key, cb, errCb);
  }
  create(pipeKey: string, data: Object, cb, errCb) {
    this._c.put('pipelines/' + pipeKey + '/fields', data, cb, errCb);
  }
  delete(pipeKey: string, key: string, cb, errCb) {
    this._c.delete('pipelines/' +pipeKey +'/fields/' + key, cb, errCb);
  }
  update(pipeKey: string, data: Object, cb, errCb) {
    this._c.post('pipelines/' + pipeKey + '/fields/' + data.key, data, cb, errCb);
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
  getAll(cb, errCb) {
    this._c.get('boxes', cb, errCb);
  }
  getForPipeline(key: string, cb, errCb) {
    this._s.Pipelines.getBoxes(key, cb, errCb);
  }
  getOne(key: string, cb, errCb) {
    this._c.get('boxes/' + key, cb, errCb);
  }
  create(pipeKey, data, cb, errCb) {
    this._c.put('pipelines/' + pipeKey + '/boxes', data, cb, errCb);
  }
  delete(key: string, cb, errCb) {
    this._c.delete('boxes/' + key, cb, errCb);
  }
  update(data, cb, errCb) {
    this._c.post('boxes/' + data.key, data, cb, errCb);
  }
  getFields(key: string, cb, errCb) {
    this._c.get('boxes/' + key + '/fields', cb, errCb);
  }
  getReminders(key: string, cb, errCb) {
    this._c.get('boxes/' + key + '/reminders', cb, errCb);
  }
  getComments(key: string, cb, errCb) {
    this._c.get('boxes/' + key + '/comments', cb, errCb);
  }
  createComment(key: string, data, cb, errCb) {
    this._c.put('boxes/' + key + '/comments', data, cb, errCb);
  }
  getFiles(key: string, cb, errCb) {
    this._c.get('boxes/' + key + '/files', cb, errCb);
  }
  getFeed(key: string, detailLevel: ?string, cb: Function, errCb: Function) {
    var qs = "";
    if (detailLevel) {
      qs += '?' + querystring.stringify({detailLevel});
    }
    this._c.get('boxes/' + key + '/newsfeed' + qs, cb, errCb);
  }
}

class BoxFields {
  _s: Streak;
  _c: ConnHelper;
  constructor(s: Streak, c: ConnHelper) {
    this._s = s;
    this._c = c;
  }
  getForBox(key: string, cb, errCb) {
    this._s.Boxes.getFields(key, cb, errCb);
  }
  getOne(boxKey: string, key: string, cb, errCb) {
    this._c.get('boxes/' + boxKey + '/fields/' + key, cb, errCb);
  }
  update(boxKey: string, data: Object, cb, errCb) {
    this._c.post('boxes/' + boxKey + '/fields/' + data.key, data, cb, errCb);
  }
}

class Files {
  _s: Streak;
  _c: ConnHelper;
  constructor(s: Streak, c: ConnHelper) {
    this._s = s;
    this._c = c;
  }
  getForBox(key: string, cb, errCb) {
    this._s.Boxes.getFiles(key, cb, errCb);
  }
  getOne(key: string, cb, errCb) {
    this._c.get('files/' + key, cb, errCb);
  }
  getContents(key: string, cb, errCb) {
    this._c.get('files/' + key + '/contents', cb, errCb, true); //don't parse JSON
  }
}

export class Streak {
  _c: ConnHelper;
  Me: Me;
  Pipelines: Object;
  Boxes: Object;
  Files: Object;

  constructor(authKey: string) {
    this._c = new ConnHelper(authKey);
    this.Me = new Me(this, this._c);
    this.Pipelines = new Pipelines(this, this._c);
    this.Boxes = new Boxes(this, this._c);
    this.Files = new Files(this, this._c);
  }

  search(query: string, cb: Function, errCb: Function) {
    this._c.get('search?query=' + encodeURIComponent(query), cb, errCb);
  }
}
