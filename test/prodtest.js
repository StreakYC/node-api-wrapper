/* @flow */
/* eslint-disable no-console */

import fs from 'fs';
import assert from 'assert';
import { Streak } from '../src';

function readKey (): Promise<string> {
  const apiKeyFile = __dirname + '/../testapikey.txt';
  return new Promise((resolve, reject) => {
    fs.readFile(apiKeyFile, 'utf8', (err, result) => {
      if (err)
        reject(err);
      else
        resolve(result.trim());
    });
  });
}

async function main () {
  let apiKey;
  try {
    apiKey = await readKey();
  } catch (err) {
    console.log('testapikey.txt not found; not running test.');
    return;
  }
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

    const webhooks = await streak.Webhooks.getForPipeline(firstPipeline.key);
    assert(typeof webhooks === 'object');
    assert(Array.isArray(webhooks.results));
    console.log('webhooks count', webhooks.results.length);

    // create test webhook
    let webhookData = {
      event: streak.Webhooks.boxCreate,
      targetUrl: 'https://escape/to/the/void'
    };
    const newWebhook = await streak.Webhooks.create(firstPipeline.key, webhookData);
    assert(typeof newWebhook === 'object');
    assert(newWebhook.event === webhookData.event);
    assert(newWebhook.targetUrl === webhookData.targetUrl);
    console.log('created webhook', newWebhook.key);

    let webhookKey = newWebhook.key;

    // get specific webhook
    const existingWebhook = await streak.Webhooks.getOne(webhookKey);
    assert(existingWebhook.event === webhookData.event);
    assert(existingWebhook.targetUrl === webhookData.targetUrl);
    console.log('retrieved webhook', existingWebhook.key);

    // update test webhook
    let updatedWebhookData = {
      targetUrl: 'http://war/for/territory'
    };
    const updateWebhookResponse = await streak.Webhooks.update(webhookKey, updatedWebhookData);
    assert(updateWebhookResponse.event === webhookData.event);
    assert(updateWebhookResponse.targetUrl === updatedWebhookData.targetUrl);
    console.log('updated webhook', updateWebhookResponse.key);

    // delete test webhook
    const deleteWebhookResponse = await streak.Webhooks.delete(webhookKey);
    assert(typeof deleteWebhookResponse === 'object');
    assert(deleteWebhookResponse.success === true);
    console.log('deleted webhook', webhookKey);

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
