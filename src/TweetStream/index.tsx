import {ITweet} from "../interfaces";
import styles from "./index.module.css";
import React from "react";
import {
  SENTIMENT_RANGE,
  MAX_BUBBLE_RADIUS,
  MIN_BUBBLE_RADIUS,
  AVERAGE_TWEET_CHAR,
  SCALE_MODE,
  COLOUR_SCALE,
  MAX_ANIM_DURATION,
  MIN_ANIM_DURATION,
  ANIM_DURATION_STEP,
  MAX_RAND_SATURATION,
} from "../constants";
import {getPercentageForRange} from "../utils";
import Spinner from "react-spinkit";
import chroma from "chroma-js";

interface ITweetBubbleProps {
  tweet: ITweet;
  onAnimationEnd: (tweet: ITweet) => void;
  onSelectTweet: (tweet: ITweet) => void;
}

const TweetBubble = ({
  tweet,
  onAnimationEnd,
  onSelectTweet,
}: ITweetBubbleProps) => {
  const animDuration = ` ${
    (tweet.id %
      ((MAX_ANIM_DURATION - MIN_ANIM_DURATION) / ANIM_DURATION_STEP)) *
      ANIM_DURATION_STEP +
    MIN_ANIM_DURATION
  }s`;
  // Get the appropriate colour based on sentiment from the colour range, then saturate randomly to add variation
  const colour = chroma
    .scale(COLOUR_SCALE)
    .mode(SCALE_MODE)(getPercentageForRange(tweet.sentiment, SENTIMENT_RANGE))
    .saturate((tweet.id % (MAX_RAND_SATURATION * 10 + 1)) / 10)
    .hex();

  return (
    <circle
      className={styles.tweetBubble}
      style={{
        animationDuration: animDuration,
      }}
      key={tweet.id}
      r={
        (tweet.text.length / AVERAGE_TWEET_CHAR) *
          (MAX_BUBBLE_RADIUS - MIN_BUBBLE_RADIUS) +
        MIN_BUBBLE_RADIUS
      }
      cy={`${Number(tweet.id) % 100}%`}
      fill={colour}
      onClick={() => window.open(tweet.url)}
      onAnimationEnd={() => onAnimationEnd(tweet)}
      onMouseEnter={() => onSelectTweet(tweet)}
      onTouchStart={() => onSelectTweet(tweet)}
    />
    // Old implementation using Framer Motion and profile pictures
    // <motion.img
    // key={tweet.id}
    // style={{x: "-10%"}}
    // animate={{x: "100%"}}
    // src={tweet.imageUrl}
    // transition={{duration: "4", ease: "easeIn"}}
    // onAnimationComplete={() => {
    // setTweets((tweets) => tweets.filter((t) => t.id !== tweet.id));
    // URL.revokeObjectURL(tweet.imageUrl);
    // }}
  );
};

interface ITweetStreamProps {
  tweets: ITweet[];
  paused: boolean;
  onAnimationEnd: (tweet: ITweet) => void;
  onSelectTweet: (tweet: ITweet) => void;
  className?: string;
}

export const TweetStream = ({
  tweets,
  paused,
  onAnimationEnd,
  onSelectTweet,
  className,
}: ITweetStreamProps) => (
  <div className={`${className ? className : ""} ${styles.container}`}>
    {tweets.length === 0 && !paused ? (
      <Spinner
        className={styles.spinner}
        name="ball-scale-ripple-multiple"
        color="white"
      />
    ) : (
      <svg id={styles.tweetSvg} className={paused ? styles.paused : ""}>
        {tweets.map((tweet) => (
          <TweetBubble
            key={tweet.id}
            tweet={tweet}
            onAnimationEnd={onAnimationEnd}
            onSelectTweet={onSelectTweet}
          />
        ))}
      </svg>
    )}
  </div>
);
