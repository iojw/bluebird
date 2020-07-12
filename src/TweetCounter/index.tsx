import {
  buildStyles,
  CircularProgressbarWithChildren,
} from "react-circular-progressbar";
import React from "react";
import styles from "./index.module.css";

interface TweetCounterProps {
  tweets: number;
  className: string;
}

export const TweetCounter = React.memo(
  ({className, tweets}: TweetCounterProps) => {
    return (
      <div className={`${styles.container} ${className ? className : ""}`}>
        <CircularProgressbarWithChildren
          value={tweets % 100}
          styles={buildStyles({
            pathTransitionDuration: 0.2,
            pathColor: "#167987",
            strokeLinecap: "round",
          })}
          strokeWidth={4}
        >
          <div className={styles.progressBarText}>
            <strong>{tweets}</strong> tweets
          </div>
        </CircularProgressbarWithChildren>
      </div>
    );
  }
);
