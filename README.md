# NodeJS Wrapper for Streak API

NodeJS package that acts as a thin wrapper over the Streak API (https://www.streak.com/api).

To use the API, just do the standard

    $ npm install --save streakapi

and then

    var streakapi = require('streakapi');
    var streak = new streakapi.Streak("api key here");
    streak.Me.get().then(function(me) {
      console.log('email', me.email);
    });

## API

All methods return promises.

    streak.Me.get();

    //pipeline functions
    streak.Pipelines.getAll();
    streak.Pipelines.getOne(pipelineKey);
    streak.Pipelines.getBoxes(pipelineKey);
    streak.Pipelines.create(data);
    streak.Pipelines.delete(pipelineKey);
    streak.Pipelines.update(data); // data must have "key" property containing pipeline key
    streak.Pipelines.getFeed(pipelineKey, detailLevel);

    //pipeline stages
    streak.Pipelines.Stages.getAll(pipelineKey);
    streak.Pipelines.Stages.getOne(pipelineKey, key);
    streak.Pipelines.Stages.create(pipelineKey, data);
    streak.Pipelines.Stages.delete(pipelineKey, key);
    streak.Pipelines.Stages.update(pipelineKey, data);

    //pipeline fields
    streak.Pipelines.Fields.getAll(pipelineKey);
    streak.Pipelines.Fields.getOne(pipelineKey, key);
    streak.Pipelines.Fields.create(pipelineKey, data);
    streak.Pipelines.Fields.delete(pipelineKey, key);
    streak.Pipelines.Fields.update(pipelineKey, data);

    //boxes
    streak.Boxes.getAll();
    streak.Boxes.getForPipeline(pipelineKey);
    streak.Boxes.getOne(boxKey);
    streak.Boxes.create(pipelineKey, data);
    streak.Boxes.delete(key);
    streak.Boxes.update(data); // data must have "key" property containing box key
    streak.Boxes.getFields(boxKey);
    streak.Boxes.getReminders(boxKey);
    streak.Boxes.getComments(boxKey);
    streak.Boxes.postComment(boxKey, message);
    streak.Boxes.getFiles(boxKey);
    streak.Boxes.getThreads(boxKey);
    streak.Boxes.getFeed(boxKey, detailLevel);

    //box fields
    streak.Boxes.Fields.getForBox(boxKey);
    streak.Boxes.Fields.getOne(boxKey, key);
    streak.Boxes.Fields.update(boxKey, data);

    //files
    streak.Files.getForBox(boxKey);
    streak.Files.getOne(fileKey);
    streak.Files.getContents(fileKey);

    //threads
    streak.Threads.getForBox(boxKey);
    streak.Threads.getOne(threadKey);

    //search
    streak.search(query);

## Types

Basic [Flow Type](http://flowtype.org/) declarations for this module are
included! If you're using Flow, then no extra setup is necessary to take
advantage of them.
