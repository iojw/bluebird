import {
  buildStyles,
  CircularProgressbarWithChildren,
} from "react-circular-progressbar";
import React from "react";
import styles from "./index.module.css";
import {RADIAL_TRANSITION_DURATION} from "../constants";

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
            pathTransitionDuration: RADIAL_TRANSITION_DURATION,
            pathColor: "#629399",
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
