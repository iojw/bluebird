import {ITweet} from "../interfaces";
import styles from "./index.module.css";
import React from "react";
import {
  COLOUR_RANGE,
  SENTIMENT_RANGE,
  MAX_BUBBLE_RADIUS,
  MIN_BUBBLE_RADIUS,
  AVERAGE_TWEET_CHAR,
} from "../constants";
import {getPercentageForRange} from "../utils";
import Spinner from "react-spinkit";

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
        {/* Credit to https://stackoverflow.com/questions/6088409/svg-drop-shadow-using-css3 */}
        {/* <filter id="dropshadow" height="150%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="0" />
          <feOffset dx="2" dy="2" result="offsetblur" />
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.3" />
          </feComponentTransfer>
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter> */}
        {tweets.map((tweet) => (
          <React.Fragment key={tweet.id}>
            <circle
              className={styles.tweetBubble}
              key={tweet.id}
              r={
                (tweet.text.length / AVERAGE_TWEET_CHAR) *
                  (MAX_BUBBLE_RADIUS - MIN_BUBBLE_RADIUS) +
                MIN_BUBBLE_RADIUS
              }
              cy={`${Number(tweet.id) % 100}%`}
              fill={
                COLOUR_RANGE[
                  Math.floor(
                    getPercentageForRange(tweet.sentiment, SENTIMENT_RANGE) *
                      COLOUR_RANGE.length
                  )
                ]
              }
              onAnimationEnd={() => onAnimationEnd(tweet)}
              onMouseEnter={() => onSelectTweet(tweet)}
              onTouchStart={() => onSelectTweet(tweet)}
            />
          </React.Fragment>
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
          // />
        ))}
      </svg>
    )}
  </div>
);
