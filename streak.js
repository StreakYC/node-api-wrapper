var https = require('https');
var querystring = require('querystring');

(function(){
	var Streak = {};

	//expose to global
	if (typeof exports !== 'undefined') {
	    if (typeof module !== 'undefined' && module.exports) {
	      exports = module.exports = Streak;
	    }
	    exports.Streak = Streak;
	}
	else {
		root['Streak'] = Streak;
	}

	//private members and functions
	var _authKey;

	function _getRequestOptions(path){
		return {
			host: 'mailfoogae.appspot.com',
			path: '/api/v1/' + path,
			auth: _authKey
		};
	}

	function _requestCallback(cb, errCb, noParse){
		return function(response){
			var str = '';
			response.on('data', function(chunk){
				str += chunk;
			});

			response.on('end', function(){
				if(cb){
					if(!noParse){
						cb(JSON.parse(str));
					}
					else{
						cb(str);
					}

				}
			});

			response.on('error', function(error){
				if(errCb){
					return errCb(error);
				}
			})
		}
	}

	function _get(path, cb, errCb, noParse){
		var opts = _getRequestOptions(path);
		var request = https.request(opts, _requestCallback(cb, errCb, noParse));
		request.end();
	}

	function _put(path, data, cb, errCb){
		var opts = _getRequestOptions(path);
		opts.method = "PUT";

		var request = https.request(opts, _requestCallback(cb, errCb));
		request.write(querystring.stringify(data));
		request.end();
	}

	function _delete(path, cb, errCb){
		var opts = _getRequestOptions(path);
		opts.method = "DELETE";
		var request = https.request(opts, _requestCallback(cb, errCb));
		request.end();
	}

	function _post(path, data, cb, errCb){
		var opts = _getRequestOptions(path);
		opts.method = "POST";
		var request = https.request(opts, _requestCallback(cb, errCb));
		request.write(querystring.stringify(data));
		request.end();
	}

	//public methods
	Streak.init = function(key){
		_authKey = key;
	}

	Streak.Me = {
		get: function(cb, errCb){
			_get('users/me', cb, errCb);
		}
	};

	Streak.Pipelines = {
		getAll: function(cb, errCb){
			_get('pipelines', cb, errCb);
		},

		getOne: function(key, cb, errCb){
			_get('pipelines/' + key, cb, errCb);
		},

		getBoxes: function(key, cb, errCb){
			_get('pipelines/' + key + '/boxes', cb, errCb);
		},

		create: function(data, cb, errCb){
			_put('pipelines', data, cb, errCb);
		},

		"delete": function(key, cb, errCb){
			_delete('pipelines/' + key, cb, errCb);
		},

		update: function(data, cb, errCb){
			_post('pipelines/' + data.key, data, cb, errCb);
		}
	};

	Streak.Pipelines.Stages = {
		getAll: function(pipeKey, cb, errCb){
			_get('pipelines/'+pipeKey+'/stages', cb, errCb);
		},

		getOne: function(pipeKey, key, cb, errCb){
			_get('pipelines/'+pipeKey +'/stages/' + key, cb, errCb);
		},

		create: function(pipeKey, data, cb, errCb){
			_put('pipelines/' + pipeKey + '/stages', data, cb, errCb);
		},

		"delete": function(pipeKey, key, cb, errCb){
			_delete('pipelines/' +pipeKey +'/stages/' + key, cb, errCb);
		},

		update: function(pipeKey, data, cb, errCb){
			_post('pipelines/' + pipeKey + '/stages/' + data.key, data, cb, errCb);
		}
	};

	Streak.Pipelines.Stages = {
		getAll: function(pipeKey, cb, errCb){
			_get('pipelines/'+pipeKey+'/fields', cb, errCb);
		},

		getOne: function(pipeKey, key, cb, errCb){
			_get('pipelines/'+pipeKey +'/fields/' + key, cb, errCb);
		},

		create: function(pipeKey, data, cb, errCb){
			_put('pipelines/' + pipeKey + '/fields', data, cb, errCb);
		},

		"delete": function(pipeKey, key, cb, errCb){
			_delete('pipelines/' +pipeKey +'/fields/' + key, cb, errCb);
		},

		update: function(pipeKey, data, cb, errCb){
			_post('pipelines/' + pipeKey + '/fields/' + data.key, data, cb, errCb);
		}
	};

	Streak.Boxes = {
		getAll: function(cb, errCb){
			_get('boxes', cb, errCb);
		},

		getForPipeline: function(key, cb, errCb){
			Streak.Pipelines.getBoxes(key, cb, errCb);
		},

		getOne: function(key, cb, errCb){
			_get('boxes/' + key, cb, errCb);
		},

		create: function(data, cb, errCb){
			_put('boxes', data, cb, errCb);
		},

		"delete": function(key, cb, errCb){
			_delete('boxes/' + key, cb, errCb);
		},

		update: function(data, cb, errCb){
			_post('boxes/' + data.key, data, cb, errCb);
		},

		getReminders: function(key, cb, errCb){
			_get('boxes/' + key + '/reminders', cb, errCb);
		},

		getComments: function(key, cb, errCb){
			_get('boxes/' + key + '/comments', cb, errCb);
		},

		getFiles: function(key, cb, errCb){
			_get('boxes/' + key + '/files', cb, errCb);
		}
	};

	Streak.Reminders = {
		getForBox: function(key, cb, errCb){
			Streak.Boxes.getReminders(key, cb, errCb);
		},

		getOne: function(key, cb, errCb){
			_get('reminders/' + key, cb, errCb);
		},

		create: function(pipeKey, data, cb, errCb){
			_put('reminders', data, cb, errCb);
		},

		"delete": function(key, cb, errCb){
			_delete('reminders/' + key, cb, errCb);
		},

		update: function(data, cb, errCb){
			_post('reminders/' + data.key, data, cb, errCb);
		}
	};

	Streak.Comments = {
		getForBox: function(key, cb, errCb){
			Streak.Boxes.getComments(key, cb, errCb);
		},

		getOne: function(key, cb, errCb){
			_get('comments/' + key, cb, errCb);
		},

		create: function(pipeKey, data, cb, errCb){
			_put('comments', data, cb, errCb);
		},

		"delete": function(key, cb, errCb){
			_delete('comments/' + key, cb, errCb);
		},

		update: function(data, cb, errCb){
			_post('comments/' + data.key, data, cb, errCb);
		}
	};

	Streak.Files = {
		getForBox: function(key, cb, errCb){
			Streak.Boxes.getFiles(key, cb, errCb);
		},

		getOne: function(key, cb, errCb){
			_get('files/' + key, cb, errCb);
		},

		getContents: function(key, cb, errCb){
			_get('comments', data, cb, errCb, true); //don't parse JSON
		}
	},

	Streak.search = function(query, cb, errCb){
		_get('search/' + querystring.stringify(query), cb, errCb);
	}

}).call(this);