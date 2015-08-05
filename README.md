# NodeJS Wrapper for Streak API

NodeJS package that acts as a thin wrapper over the Streak API (https://www.streak.com/api).

To include the api just do the standard

    $ npm install --save streakapi

and then

    var streakapi = require('streakapi');
    var streak = new streakapi.Streak("api key here");

## API

    streak.Me.get(callback, errorCallback);

    //pipeline functions
    streak.Pipelines.getAll(callback, errorCallback);
    streak.Pipelines.getOne(pipelineKey, callback, errorCallback);
    streak.Pipelines.getBoxes(pipelineKey, callback, errorCallback);
    streak.Pipelines.create(data, callback, errorCallback);
    streak.Pipelines.delete(pipelineKey, callback, errorCallback);
    streak.Pipelines.update(data, callback, errorCallback);
    streak.Pipelines.getFeed(pipelineKey, detailLevel, callback, errorCallback);

    //pipeline stages
    streak.Pipelines.Stages.getAll(pipelineKey, callback, errorCallback);
    streak.Pipelines.Stages.getOne(pipelineKey, key, callback, errorCallback);
    streak.Pipelines.Stages.create(pipelineKey, data, callback, errorCallback);
    streak.Pipelines.Stages.delete(pipelineKey, key, callback, errorCallback);
    streak.Pipelines.Stages.update(pipelineKey, data, callback, errorCallback);

    //pipeline fields
    streak.Pipelines.Fields.getAll(pipelineKey, callback, errorCallback);
    streak.Pipelines.Fields.getOne(pipelineKey, key, callback, errorCallback);
    streak.Pipelines.Fields.create(pipelineKey, data, callback, errorCallback);
    streak.Pipelines.Fields.delete(pipelineKey, key, callback, errorCallback);
    streak.Pipelines.Fields.update(pipelineKey, data, callback, errorCallback);

    //boxes
    streak.Boxes.getAll(callback, errorCallback);
    streak.Boxes.getForPipeline(boxKey, callback, errorCallback);
    streak.Boxes.getOne(boxKey, callback, errorCallback);
    streak.Boxes.create(pipelineKey, data, callback, errorCallback);
    streak.Boxes.delete(key, callback, errorCallback);
    streak.Boxes.update(data, callback, errorCallback);
    streak.Boxes.getFields(boxKey, callback, errorCallback);
    streak.Boxes.getReminders(boxKey, callback, errorCallback);
    streak.Boxes.getComments(boxKey, callback, errorCallback);
    streak.Boxes.getFiles(boxKey, callback, errorCallback);
    streak.Boxes.getFeed(boxKey, detailLevel, callback, errorCallback);

    //box fields
    streak.Boxes.Fields.getForBox(boxKey, callback, errorCallback);
    streak.Boxes.Fields.getOne(boxKey, key, callback, errorCallback);
    streak.Boxes.Fields.update(boxKey, data, callback, errorCallback);

    //files
    streak.Files.getForBox(boxKey, callback, errorCallback);
    streak.Files.getOne(fileKey, callback, errorCallback);
    streak.Files.getContents(fileKey, callback, errorCallback);

    //search
    streak.search(query, callback, errorCallback);
