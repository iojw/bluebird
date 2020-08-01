import React from "react";
import GaugeChart from "react-gauge-chart";
import chroma from "chroma-js";
import {
  SENTIMENT_RANGE,
  FIRST_SAMPLE_BREAKPOINT,
  SECOND_SAMPLE_BREAKPOINT,
  NO_OF_COLOURS,
  SCALE_MODE,
  COLOUR_SCALE,
} from "../constants";
import styles from "./index.module.css";
import {getPercentageForRange} from "../utils";

interface ITweetGaugeProps {
  score: number;
  totalTweets: number;
  className?: string;
}

// Rendering the gauge is expensive, so memoize it
const GaugeDisplay = React.memo(({percentage}: {percentage: number}) => (
  <GaugeChart
    id="gauge"
    className={styles.gauge}
    nrOfLevels={NO_OF_COLOURS}
    percent={percentage}
    hideText={true}
    animDelay={0}
    arcWidth={0.25}
    arcPadding={0.01}
    colors={chroma.scale(COLOUR_SCALE).mode(SCALE_MODE).colors(NO_OF_COLOURS)}
    cornerRadius={2}
    // Default inline style is width 100%, remove this to set via CSS instead
    style={{}}
  />
));

export const TweetGauge = ({
  score,
  totalTweets,
  className,
}: ITweetGaugeProps) => {
  const percentage = getPercentageForRange(score, SENTIMENT_RANGE);

  let roundedPercentage: number;
  if (totalTweets < FIRST_SAMPLE_BREAKPOINT) {
    roundedPercentage = 0.5;
  } else if (totalTweets < SECOND_SAMPLE_BREAKPOINT) {
    roundedPercentage = (Math.round((percentage * 100) / 5) * 5) / 100;
  } else {
    roundedPercentage = Math.round(percentage * 100) / 100;
  }

  const sentimentPercentage = `${score >= 0 ? "+" : ""}${(
    (score / SENTIMENT_RANGE) *
    100
  ).toFixed(2)}%`;

  return (
    <div className={`${styles.container} ${className ? className : ""}`}>
      <GaugeDisplay percentage={roundedPercentage} />
      <div className={styles.text}>
        Average sentiment:&nbsp;
        <strong>{sentimentPercentage}</strong>
      </div>
    </div>
  );
};
