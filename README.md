NodeJS Wrapper for Streak API
================

NodeJS package that acts as a thin wrapper over the Streak API. You can checkout the full API documentation at https://www.steak.com/api

To include the api just do the standard

    $ node install streakapi

and then

    var Streak = require('streakapi');
    Streak.init('api_key');

Streak API functions:

    Streak.Me.get(callback, errorCallback);

    //pipeline functions
	Streak.Pipelines.getAll(callback, errorCallback);
	Streak.Pipelines.getOne(pipelineKey, callback, errorCallback);
	Streak.Pipelines.getBoxes(pipelineKey, callback, errorCallback);
	Streak.Pipelines.create(data, callback, errorCallback);
	Streak.Pipelines.delete(pipelineKey, callback, errorCallback);
	Streak.Pipelines.update(data, callback, errorCallback);
	Streak.Pipelines.getFeed(pipelineKey, activityFrom, specifics, detailLevel, callback, errorCallback);

	//pipeline stages
	Streak.Pipelines.Stages.getAll(pipelineKey, callback, errorCallback);
	Streak.Pipelines.Stages.getOne(pipelineKey, key, callback, errorCallback);
	Streak.Pipelines.Stages.create(pipelineKey, data, callback, errorCallback);
	Streak.Pipelines.Stages.delete(pipelineKey, key, callback, errorCallback);
	Streak.Pipelines.Stages.update(pipelineKey, data, callback, errorCallback);

	//pipeline fields
	Streak.Pipelines.Fields.getAll(pipelineKey, callback, errorCallback);
	Streak.Pipelines.Fields.getOne(pipelineKey, key, callback, errorCallback);
	Streak.Pipelines.Fields.create(pipelineKey, data, callback, errorCallback);
	Streak.Pipelines.Fields.delete(pipelineKey, key, callback, errorCallback);
	Streak.Pipelines.Fields.update(pipelineKey, data, callback, errorCallback);


	//boxes
	Streak.Boxes.getAll(callback, errorCallback);
	Streak.Boxes.getForPipeline(boxKey, callback, errorCallback);
	Streak.Boxes.getOne(boxKey, callback, errorCallback);
	Streak.Boxes.create(pipelineKey, data, callback, errorCallback);
	Streak.Boxes.delete(key, callback, errorCallback);
	Streak.Boxes.update(data, callback, errorCallback);
	Streak.Boxes.getFields(boxKey, callback, errorCallback);
	Streak.Boxes.getReminders(boxKey, callback, errorCallback);
	Streak.Boxes.getComments(boxKey, callback, errorCallback);
	Streak.Boxes.getFiles(boxKey, callback, errorCallback);
	Streak.Boxes.getFeed(boxKey, activityFrom, specifics, detailLevel, callback, errorCallback);


	//box fields
	Streak.Boxes.Fields.getForBox(boxKey, callback, errorCallback);
	Streak.Boxes.Fields.getOne(boxKey, key, callback, errorCallback);
	Streak.Boxes.Fields.update(boxKey, data, callback, errorCallback);


	//reminders
	Streak.Reminders.getForBox(boxKey, callback, errorCallback);
	Streak.Reminders.getOne(reminderKey, callback, errorCallback);
	Streak.Reminders.create(boxKey, data, callback, errorCallback);
	Streak.Reminders.delete(reminderKey, callback, errorCallback);
	Streak.Reminders.update(data, callback, errorCallback);


	//files
	Streak.Files.getForBox(boxKey, callback, errorCallback);
	Streak.Files.getOne(fileKey, callback, errorCallback);
	Streak.Files.getContents(fileKey, callback, errorCallback);

	//search
	Streak.search(query, callback, errorCallback);