/* @flow */
//jshint ignore:start

var https: any/* flow https defs seem broken */ = require('https');
var querystring = require('querystring');

export class Streak {
  _authKey: string;
  Me: Object;
  Pipelines: Object;
  Boxes: Object;
  Files: Object;

  constructor(authKey: string) {
    this._authKey = authKey;

    this.Me = {
    	get(cb, errCb) {
    		self._get('users/me', cb, errCb);
    	}
    };

    var self = this;

    this.Pipelines = {
    	getAll(cb, errCb){
    		self._get('pipelines', cb, errCb);
    	},

    	getOne(key, cb, errCb){
    		self._get('pipelines/' + key, cb, errCb);
    	},

    	getBoxes(key, cb, errCb){
    		self._get('pipelines/' + key + '/boxes', cb, errCb);
    	},

    	getBoxesInStage (key, stageKey, cb, errCb){
    		self._get('pipelines/' + key + '/boxes?stageKey='+ encodeURIComponent(stageKey), cb, errCb);
    	},

    	create(data, cb, errCb){
    		self._put('pipelines', data, cb, errCb);
    	},

    	delete(key, cb, errCb){
    		self._delete('pipelines/' + key, cb, errCb);
    	},

    	update(data, cb, errCb){
    		self._post('pipelines/' + data.key, data, cb, errCb);
    	},

    	getFeed(key, detailLevel, cb, errCb){
    		var qs = "?";
    		if(detailLevel){
    			qs += "&detailLevel=" + encodeURIComponent(detailLevel);
    		}

    		self._get('pipelines/' + key + '/newsfeed' + qs, cb, errCb);
    	},

      Stages: {
      	getAll(pipeKey: string, cb, errCb){
      		self._get('pipelines/'+pipeKey+'/stages', cb, errCb);
      	},

      	getOne(pipeKey: string, key: string, cb, errCb){
      		self._get('pipelines/'+pipeKey +'/stages/' + key, cb, errCb);
      	},

      	create(pipeKey: string, data: Object, cb, errCb){
      		self._put('pipelines/' + pipeKey + '/stages', data, cb, errCb);
      	},

      	"delete"(pipeKey: string, key: string, cb, errCb){
      		self._delete('pipelines/' +pipeKey +'/stages/' + key, cb, errCb);
      	},

      	update(pipeKey: string, data: Object, cb, errCb){
      		self._post('pipelines/' + pipeKey + '/stages/' + data.key, data, cb, errCb);
      	}
      },

      Fields: {
      	getAll(pipeKey: string, cb, errCb){
      		self._get('pipelines/'+pipeKey+'/fields', cb, errCb);
      	},

      	getOne(pipeKey: string, key: string, cb, errCb){
      		self._get('pipelines/'+pipeKey +'/fields/' + key, cb, errCb);
      	},

      	create(pipeKey: string, data: Object, cb, errCb){
      		self._put('pipelines/' + pipeKey + '/fields', data, cb, errCb);
      	},

      	delete(pipeKey: string, key: string, cb, errCb){
      		self._delete('pipelines/' +pipeKey +'/fields/' + key, cb, errCb);
      	},

      	update(pipeKey: string, data: Object, cb, errCb){
      		self._post('pipelines/' + pipeKey + '/fields/' + data.key, data, cb, errCb);
      	}
      }
    };

    this.Boxes = {
    	getAll(cb, errCb){
    		self._get('boxes', cb, errCb);
    	},

    	getForPipeline(key: string, cb, errCb){
    		self.Pipelines.getBoxes(key, cb, errCb);
    	},

    	getOne(key: string, cb, errCb){
    		self._get('boxes/' + key, cb, errCb);
    	},

    	create(pipeKey, data, cb, errCb){
    		self._put('pipelines/' + pipeKey + '/boxes', data, cb, errCb);
    	},

    	delete(key: string, cb, errCb){
    		self._delete('boxes/' + key, cb, errCb);
    	},

    	update(data, cb, errCb){
    		self._post('boxes/' + data.key, data, cb, errCb);
    	},

    	getFields(key: string, cb, errCb){
    		self._get('boxes/' + key + '/fields', cb, errCb);
    	},

    	getReminders(key: string, cb, errCb){
    		self._get('boxes/' + key + '/reminders', cb, errCb);
    	},

    	getComments(key: string, cb, errCb){
    		self._get('boxes/' + key + '/comments', cb, errCb);
    	},

    	createComment(key: string, data, cb, errCb){
    		self._put('boxes/' + key + '/comments', data, cb, errCb);
    	},

    	getFiles(key: string, cb, errCb){
    		self._get('boxes/' + key + '/files', cb, errCb);
    	},

    	getFeed(key: string, detailLevel: ?string, cb: Function, errCb: Function){
    		var qs = "";
    		if (detailLevel) {
          qs += '?' + querystring.stringify({detailLevel});
    		}
    		self._get('boxes/' + key + '/newsfeed' + qs, cb, errCb);
    	},

      Fields: {
      	getForBox(key: string, cb, errCb){
      		self.Boxes.getFields(key, cb, errCb);
      	},

      	getOne(boxKey: string, key: string, cb, errCb){
      		self._get('boxes/' + boxKey + '/fields/' + key, cb, errCb);
      	},

      	update(boxKey: string, data: Object, cb, errCb){
      		self._post('boxes/' + boxKey + '/fields/' + data.key, data, cb, errCb);
      	}
      }
    };

    this.Files = {
    	getForBox(key: string, cb, errCb){
    		self.Boxes.getFiles(key, cb, errCb);
    	},

    	getOne(key: string, cb, errCb){
    		self._get('files/' + key, cb, errCb);
    	},

    	getContents(key: string, cb, errCb){
    		self._get('files/' + key + '/contents', cb, errCb, true); //don't parse JSON
    	}
    };
  }

  search(query: string, cb: Function, errCb: Function) {
    this._get('search?query=' + encodeURIComponent(query), cb, errCb);
  }

  _getRequestOptions(path: string): Object {
  	return {
  		host: 'mailfoogae.appspot.com',
  		path: '/api/v1/' + path,
  		auth: this._authKey
  	};
  }

  _requestCallback(cb: Function, errCb: Function, noParse: boolean=false): Function {
  	return function(response){
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

  _get(path: string, cb: Function, errCb: Function, noParse:boolean=false){
  	var opts = this._getRequestOptions(path);
  	var request = https.request(opts, this._requestCallback(cb, errCb, noParse));
  	request.on('error', errCb)
  	request.end();
  }

  _put(path: string, data: any, cb: Function, errCb: Function){
  	var dstr = querystring.stringify(data);
  	var opts = this._getRequestOptions(path + "?" + dstr);
  	opts.method = "PUT";

  	var request = https.request(opts, this._requestCallback(cb, errCb));

  	request.on('error', errCb)
  	request.end();
  }

  _delete(path: string, cb: Function, errCb: Function) {
  	var opts = this._getRequestOptions(path);
  	opts.method = "DELETE";
  	var request = https.request(opts, this._requestCallback(cb, errCb));
  	request.on('error', errCb)
  	request.end();
  }

  _post(path: string, data: any, cb: Function, errCb: Function) {
  	var dstr = JSON.stringify(data);
  	var opts = this._getRequestOptions(path);

  	opts.method = "POST";
  	opts.headers = {
  		'Content-Type': 'application/json',
  		'Content-Length': dstr.length
  	}

  	var request = https.request(opts, this._requestCallback(cb, errCb));

  	request.write(dstr);
  	request.on('error', errCb)
  	request.end();
  }
}
