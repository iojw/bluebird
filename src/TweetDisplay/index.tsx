import {ITweet} from "../interfaces";
import React from "react";
import styles from "./index.module.css";
import {
  SENTIMENT_RANGE,
  TWEET_EXPIRY,
  COLOUR_SCALE,
  SCALE_MODE,
} from "../constants";
import {getPercentageForRange} from "../utils";
import chroma from "chroma-js";

interface ITweetDisplayProps {
  tweet: ITweet | undefined;
  emptyMessage: string;
  className?: string;
}

const Tweet = ({tweet}: {tweet: ITweet}) => {
  const relativeTime = Math.round((Date.now() - tweet.time) / 1000);
  const sentimentColour = chroma
    .scale(COLOUR_SCALE)
    .mode(SCALE_MODE)(getPercentageForRange(tweet.sentiment, SENTIMENT_RANGE))
    .hex();

  return (
    <a
      href={tweet.url}
      className={styles.tweet}
      target="_blank"
      rel="noopener noreferrer"
    >
      <div style={{backgroundColor: sentimentColour}} className={styles.header}>
        <span className={styles.name}>{tweet.name}</span>
        <span className={styles.secondary}>{` @${tweet.username}`}</span>
        <div className={styles.secondary}>
          {`${relativeTime} seconds ago · Valence: ${tweet.sentiment}`}
        </div>
      </div>
      <div className={styles.text}>{tweet.text}</div>
    </a>
  );
};

// No memoization here as we want the time to update
export const TweetDisplay = ({
  className,
  tweet,
  emptyMessage,
}: ITweetDisplayProps) => (
  <div className={`${styles.container} ${className ? className : ""}`}>
    {tweet && (Date.now() - tweet.time) / 1000 < TWEET_EXPIRY ? (
      <>
        <Tweet tweet={tweet} />
      </>
    ) : (
      <div className={styles.emptyMessage}>{emptyMessage}</div>
    )}
  </div>
);
