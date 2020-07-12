import {ITweetResponse, ITweetEvent} from "../interfaces";
import {createTweetFromResponse} from "./tweetUtils";

// For the PubNub script
// eslint-disable-next-line no-restricted-globals
globalThis.window = self;
// eslint-disable-next-line no-restricted-globals
const ctx: Worker = self as any;

importScripts("https://cdn.pubnub.com/sdk/javascript/pubnub.4.28.0.min.js");

// Imported dynamically from above
// @ts-ignore
const pubnub = new PubNub({
  subscribeKey: "sub-c-78806dd4-42a6-11e4-aed8-02ee2ddab7fe",
  ssl: true,
});

const handleData = (response: ITweetResponse) => {
  if (response.lang !== "en") return;

  // TODO: Handle neutral tweets?
  const tweet = createTweetFromResponse(response);
  ctx.postMessage(tweet);
};

pubnub.addListener({
  message: (event: ITweetEvent) => handleData(event.message),
});
pubnub.subscribe({
  channels: ["pubnub-twitter"],
});
