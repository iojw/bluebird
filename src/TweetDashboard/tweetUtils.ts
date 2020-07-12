import {ITweetResponse, ITweet} from "../interfaces";
import {calculateSentiment} from "./sentiment";

export const createTweetFromResponse = (message: ITweetResponse): ITweet => {
  // Fetch profile picture and create a local URL for it
  // fetch(message.user.profile_image_url_https)
  //   .then((response) => response.blob())
  //   .then((blob) => URL.createObjectURL(blob))
  //   .then((url) =>

  const sanitizedText = message.text.replace(/@\S+/gi, "");

  return {
    url: `https://twitter.com/${message.user.screen_name}/status/${message.id_str}`,
    name: message.user.name,
    username: message.user.screen_name,
    text: sanitizedText,
    time: Number(message.timestamp_ms),
    sentiment: calculateSentiment(sanitizedText),
    id: message.id,
  };
};
