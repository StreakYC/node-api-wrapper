/* @flow */
/* eslint-disable no-console */

import fs from 'fs';
import assert from 'assert';
import {Streak} from '../src';

function readKey(): Promise<string> {
  const apiKeyFile = __dirname+'/../testapikey.txt';
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
  const apiKey = await readKey();
  const streak = new Streak(apiKey);
  const response = await streak.Me.get();
  console.log('email', response.email);

  assert.equal(typeof response.email, 'string');
  assert(response.email.indexOf('@') != -1);
  const pipelines = await streak.Pipelines.getAll();
  assert(Array.isArray(pipelines));
  console.log('pipelines', pipelines.map(p => p.name));

  if (pipelines.length >= 1) {
    const firstPipeline = await streak.Pipelines.getOne(pipelines[0].key);
    assert.strictEqual(firstPipeline.name, pipelines[0].name);
    assert.strictEqual(firstPipeline.key, pipelines[0].key);
    assert.strictEqual(firstPipeline.creatorKey, pipelines[0].creatorKey);

    const newsfeed = await streak.Pipelines.getFeed(firstPipeline.key, null);
    assert(Array.isArray(newsfeed));
    console.log('newsfeed length', newsfeed.length);

    const cNewsfeed = await streak.Pipelines.getFeed(firstPipeline.key, 'CONDENSED');
    assert(Array.isArray(cNewsfeed));
    console.log('condensed newsfeed length', cNewsfeed.length);

    let failed = false;
    try {
      await streak.Pipelines.getFeed(firstPipeline.key, 'xxINVALID');
    } catch (err) {
      assert(err instanceof Error);
      assert.strictEqual(typeof err.statusCode, 'number');
      assert.notEqual(err.statusCode, 200);
      failed = true;
      console.log('invalid request failed as expected');
    }
    assert(failed);

    const boxes = await streak.Boxes.getForPipeline(firstPipeline.key);
    assert(Array.isArray(boxes));
    console.log('boxes count', boxes.length);

    if (boxes.length >= 1) {
      const firstBox = await streak.Boxes.getOne(boxes[0].key);
      assert.strictEqual(firstBox.name, boxes[0].name);
      assert.strictEqual(firstBox.key, boxes[0].key);

      const fields = await streak.Boxes.Fields.getForBox(firstBox.key);
      assert(Array.isArray(fields));
      console.log('field count', fields.length);
    } else {
      console.log('no boxes, skipping box checks');
    }
  } else {
    console.log('no pipelines, skipping pipeline checks');
  }

  console.log('test successful');
}

main().catch(err => {
  console.error(err);
  if (err && err.stack) {
    console.error(err.stack);
  }
  process.exit(1);
});
