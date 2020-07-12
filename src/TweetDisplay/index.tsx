import {ITweet} from "../interfaces";
import React from "react";
import styles from "./index.module.css";
import {COLOUR_RANGE, SENTIMENT_RANGE} from "../constants";
import {getPercentageForRange} from "../utils";

interface ITweetDisplayProps {
  tweet: ITweet | undefined;
  emptyMessage: string;
  className?: string;
}

const Tweet = ({tweet}: {tweet: ITweet}) => {
  const relativeTime = Math.round((Date.now() - tweet.time) / 1000);
  const sentimentColour =
    COLOUR_RANGE[
      Math.floor(
        getPercentageForRange(tweet.sentiment, SENTIMENT_RANGE) *
          COLOUR_RANGE.length
      )
    ];

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
    {tweet ? (
      <>
        <Tweet tweet={tweet} />
      </>
    ) : (
      <div className={styles.emptyMessage}>{emptyMessage}</div>
    )}
  </div>
);
