/* @flow */
//jshint ignore:start

var fs = require('fs');
var assert = require('assert');
import {Streak} from '../src';

function readKey(): Promise<string> {
  var apiKeyFile = __dirname+'/../testapikey.txt';
  return new Promise((resolve, reject) => {
    fs.readFile(apiKeyFile, 'utf8', (err, result) => {
      if (err)
        reject(err);
      else
        resolve(result.trim());
    });
  });
}

async function main() {
  var apiKey = await readKey();
  var streak = new Streak(apiKey);
  var response = await streak.Me.get();
  console.log('email', response.email);

  assert.equal(typeof response.email, 'string');
  assert(response.email.indexOf('@') != -1);
  var pipelines = await streak.Pipelines.getAll();
  assert(Array.isArray(pipelines));
  console.log('pipelines', pipelines.map(p => p.name));

  if (pipelines.length >= 1) {
    var firstPipeline = await streak.Pipelines.getOne(pipelines[0].key);
    assert.strictEqual(firstPipeline.name, pipelines[0].name);
    assert.strictEqual(firstPipeline.key, pipelines[0].key);
    assert.strictEqual(firstPipeline.creatorKey, pipelines[0].creatorKey);

    var newsfeed = await streak.Pipelines.getFeed(firstPipeline.key, null);
    assert(Array.isArray(newsfeed));
    console.log('newsfeed length', newsfeed.length);

    var cNewsfeed = await streak.Pipelines.getFeed(firstPipeline.key, 'CONDENSED');
    assert(Array.isArray(cNewsfeed));
    console.log('condensed newsfeed length', cNewsfeed.length);

    var failed = false;
    try {
      var newsfeedFail = await streak.Pipelines.getFeed(firstPipeline.key, 'xxINVALID');
    } catch(err) {
      assert(err instanceof Error);
      assert.strictEqual(typeof err.statusCode, 'number');
      assert.notEqual(err.statusCode, 200);
      failed = true;
      console.log("invalid request failed as expected");
    }
    assert(failed);

    var boxes = await streak.Boxes.getForPipeline(firstPipeline.key);
    assert(Array.isArray(boxes));
    console.log('boxes count', boxes.length);

    if (boxes.length >= 1) {
      var firstBox = await streak.Boxes.getOne(boxes[0].key);
      assert.strictEqual(firstBox.name, boxes[0].name);
      assert.strictEqual(firstBox.key, boxes[0].key);

      var fields = await streak.Boxes.Fields.getForBox(firstBox.key);
      assert(Array.isArray(fields));
      console.log('field count', fields.length);
    } else {
      console.log('no boxes, skipping box checks');
    }
  } else {
    console.log('no pipelines, skipping pipeline checks');
  }

  console.log("test successful");
}

main().catch(err => {
  console.error(err);
  if (err && err.stack) {
    console.error(err.stack);
  }
  process.exit(1);
});
