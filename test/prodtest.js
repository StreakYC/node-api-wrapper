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
  var response = await new Promise((resolve, reject) => {
    streak.Me.get(resolve, reject);
  });
  console.log('email', response.email);

  assert.equal(typeof response.email, 'string');
  assert(response.email.indexOf('@') != -1);
  var pipelines = await new Promise((resolve, reject) => {
    streak.Pipelines.getAll(resolve, reject);
  });
  assert(Array.isArray(pipelines));
  console.log('pipelines', pipelines.map(p => p.name));

  if (pipelines.length >= 1) {
    var firstPipeline = await new Promise((resolve, reject) => {
      streak.Pipelines.getOne(pipelines[0].key, resolve, reject);
    });
    assert.strictEqual(firstPipeline.name, pipelines[0].name);
    assert.strictEqual(firstPipeline.key, pipelines[0].key);
    assert.strictEqual(firstPipeline.creatorKey, pipelines[0].creatorKey);

    var newsfeed = await new Promise((resolve, reject) => {
      streak.Pipelines.getFeed(firstPipeline.key, null, resolve, reject);
    });
    assert(Array.isArray(newsfeed));
    console.log('newsfeed length', newsfeed.length);

    var cNewsfeed = await new Promise((resolve, reject) => {
      streak.Pipelines.getFeed(firstPipeline.key, 'CONDENSED', resolve, reject);
    });
    assert(Array.isArray(cNewsfeed));
    console.log('condensed newsfeed length', cNewsfeed.length);

    var failed = false;
    try {
      var newsfeedFail = await new Promise((resolve, reject) => {
        streak.Pipelines.getFeed(firstPipeline.key, 'xxINVALID', resolve, reject);
      });
    } catch(err) {
      assert(err instanceof Error);
      assert.strictEqual(typeof err.statusCode, 'number');
      assert.notEqual(err.statusCode, 200);
      failed = true;
      console.log("invalid request failed as expected");
    }
    assert(failed);

    var boxes = await new Promise((resolve, reject) => {
      streak.Boxes.getForPipeline(firstPipeline.key, resolve, reject);
    });
    assert(Array.isArray(boxes));
    console.log('boxes count', boxes.length);

    if (boxes.length >= 1) {
      var firstBox = await new Promise((resolve, reject) => {
        streak.Boxes.getOne(boxes[0].key, resolve, reject);
      });
      assert.strictEqual(firstBox.name, boxes[0].name);
      assert.strictEqual(firstBox.key, boxes[0].key);

      var fields = await new Promise((resolve, reject) => {
        streak.Boxes.Fields.getForBox(firstBox.key, resolve, reject);
      });
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
