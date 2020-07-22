import React, {useEffect, useReducer, useState} from "react";
import {TweetGauge} from "../TweetGauge";
import {TweetStream} from "../TweetStream";
import {ITweet, ITweetResponse} from "../interfaces";
import {TweetDashboardActions} from "./actions";
import {TweetDashboardReducer} from "./reducer";
import {TweetDisplay} from "../TweetDisplay";
import styles from "./index.module.css";
// eslint-disable-next-line import/no-webpack-loader-syntax
import Worker from "worker-loader!./tweetWorker.ts";
import {createTweetFromResponse} from "./tweetUtils";
import PubNub from "pubnub";
import {TweetCounter} from "../TweetCounter";

export const TweetDashboard = () => {
  const [state, dispatch] = useReducer(TweetDashboardReducer, {
    totalTweets: 0,
    totalScore: 0.5,
    tweets: [],
  });
  const [selected, setSelected] = useState<ITweet>();

  useEffect(() => {
    if (!Worker) {
      // Non WebWorker implementation
      const handleData = (response: ITweetResponse) => {
        if (response.lang !== "en") return;
        dispatch({
          type: TweetDashboardActions.ADD_TWEET,
          payload: createTweetFromResponse(response),
        });
      };
      const pubnub = new PubNub({
        subscribeKey: "sub-c-78806dd4-42a6-11e4-aed8-02ee2ddab7fe",
        ssl: true,
      });
      pubnub.addListener({
        message: (event) => handleData(event.message),
      });
      pubnub.subscribe({
        channels: ["pubnub-twitter"],
      });
      return () =>
        pubnub.unsubscribe({
          channels: ["pubnub-twitter"],
        });
    }

    const worker = new Worker();
    worker.onmessage = (event: MessageEvent) => {
      dispatch({type: TweetDashboardActions.ADD_TWEET, payload: event.data});
    };
    return () => worker.terminate();
  }, []);

  const exactScore = state.totalScore / state.totalTweets;

  return (
    <div className={styles.dashboard}>
      <TweetGauge
        className={styles.card}
        score={exactScore}
        totalTweets={state.totalTweets}
      />
      <TweetCounter className={styles.card} tweets={state.totalTweets} />
      <TweetDisplay
        className={styles.card}
        tweet={selected}
        emptyMessage="Touch a tweet below to view it here"
      />
      <div className={styles["flex-break"]} />
      <TweetStream
        className={styles.stream}
        tweets={state.tweets}
        onAnimationEnd={(tweet) => {
          dispatch({
            type: TweetDashboardActions.CLEAR_TWEET,
            payload: tweet.id,
          });
        }}
        onSelectTweet={(tweet) => setSelected(tweet)}
      />
      {/* TODO: Update for Worker */}
      {/* <div className={styles.controls}>
        <button className={styles.button} onClick={stopTweets}>
          STOP
        </button>
        <button className={styles.button} onClick={startTweets}>
          START
        </button>
      </div> */}
    </div>
  );
};
