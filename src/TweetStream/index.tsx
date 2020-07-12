import {ITweet} from "../interfaces";
import styles from "./index.module.css";
import React from "react";
import {COLOUR_RANGE, SENTIMENT_RANGE, BUBBLE_RADIUS} from "../constants";
import {getPercentageForRange} from "../utils";

interface ITweetStreamProps {
  tweets: ITweet[];
  onAnimationEnd: (tweet: ITweet) => void;
  onSelectTweet: (tweet: ITweet) => void;
  className?: string;
}

export const TweetStream = ({
  tweets,
  onAnimationEnd,
  onSelectTweet,
  className,
}: ITweetStreamProps) => (
  <svg id={styles.tweetSvg} className={className ? className : ""}>
    {tweets.map((tweet) => (
      <React.Fragment key={tweet.id}>
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
        <circle
          // style={{filter: "url(#dropshadow)"}}
          className={styles.tweetBubble}
          key={tweet.id}
          r={BUBBLE_RADIUS}
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
);
