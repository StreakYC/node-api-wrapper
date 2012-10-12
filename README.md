NodeJS Wrapper for Streak API
================

NodeJS package that acts as a thin wrapper over the Streak API. You can checkout the full API documentation at https://www.steak.com/api

To include the api just do the standard

    $ node install streakapi

and then

    var Streak = require('streakapi');
    Streak.init('api_key');

Streak API functions:

    Streak.Me.get(callback, error_callback);
	Streak.Pipelines
		.getAll(cb, errCb)
		.getOne(key, cb, errCb)
		.getBoxes(key, cb, errCb)

		create: function(data, cb, errCb){
			_put('pipelines', data, cb, errCb);
		},

		"delete": function(key, cb, errCb){
			_delete('pipelines/' + key, cb, errCb);
		},

		update: function(data, cb, errCb){
			_post('pipelines/' + data.key, data, cb, errCb);
		},

		getFeed: function(key, activityFrom, specifics, detailLevel, cb, errCb){
			var qs = "?";
			if(activityFrom && activityFrom.length > 0){
				qs += "activityFrom=" + encodeURIComponent(activityFrom.toString());
			}

			if(specifics && specifics.length > 0){
				qs += "&specifics=" + encodeURIComponent(specifics.toString());
			}

			if(detailLevel){
				qs += "&detailLevel=" + encodeURIComponent(detailLevel);
			}

			_get('pipelines/' + key + '/newsfeed' + qs, cb, errCb);
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

	Streak.Pipelines.Fields = {
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

		create: function(pipeKey, data, cb, errCb){
			_put('pipelines/' + pipeKey + '/boxes', data, cb, errCb);
		},

		"delete": function(key, cb, errCb){
			_delete('boxes/' + key, cb, errCb);
		},

		update: function(data, cb, errCb){
			_post('boxes/' + data.key, data, cb, errCb);
		},

		getFields: function(key, cb, errCb){
			_get('boxes/' + key + '/fields', cb, errCb);
		},

		getReminders: function(key, cb, errCb){
			_get('boxes/' + key + '/reminders', cb, errCb);
		},

		getComments: function(key, cb, errCb){
			_get('boxes/' + key + '/comments', cb, errCb);
		},

		getFiles: function(key, cb, errCb){
			_get('boxes/' + key + '/files', cb, errCb);
		},

		getFeed: function(key, activityFrom, specifics, detailLevel, cb, errCb){
			var qs = "?";
			if(activityFrom && activityFrom.length > 0){
				qs += "activityFrom=" + encodeURIComponent(activityFrom.toString());
			}

			if(specifics && specifics.length > 0){
				qs += "&specifics=" + encodeURIComponent(activities.toString());
			}

			if(detailLevel){
				qs += "&=" + encodeURIComponent(detailLevel);
			}

			_get('boxes/' + key + '/newsfeed' + qs, cb, errCb);
		}
	};

	Streak.Boxes.Fields = {
		getForBox: function(key, cb, errCb){
			Streak.Boxes.getFields(key, cb, errCb);
		},

		getOne: function(boxKey, key, cb, errCb){
			_get('boxes/' + boxKey + '/fields/' + key, cb, errCb);
		},

		update: function(boxKey, data, cb, errCb){
			_post('boxes/' + boxKey + '/fields/' + data.key, data, cb, errCb);
		}
	};

	Streak.Reminders = {
		getForBox: function(key, cb, errCb){
			Streak.Boxes.getReminders(key, cb, errCb);
		},

		getOne: function(key, cb, errCb){
			_get('reminders/' + key, cb, errCb);
		},

		create: function(boxKey, data, cb, errCb){
			_put('boxes/' + boxKey + '/reminders', data, cb, errCb);
		},

		"delete": function(key, cb, errCb){
			_delete('reminders/' + key, cb, errCb);
		},

		update: function(data, cb, errCb){
			_post('reminders/' + data.key, data, cb, errCb);
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
			_get('files/' + key + '/contents', cb, errCb, true); //don't parse JSON
		}
	};

	Streak.search = function(query, cb, errCb){
		_get('search?query=' + encodeURIComponent(query), cb, errCb);
	}
