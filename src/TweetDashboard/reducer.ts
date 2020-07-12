import {Reducer} from "react";
import {TweetDashboardActionTypes, TweetDashboardActions} from "./actions";
import {ITweet} from "../interfaces";
import {MAX_TWEET_BUBBLES} from "../constants";

export interface ITweetDashboardState {
  totalTweets: number;
  totalScore: number;
  tweets: ITweet[];
}

const isSentimentValid = (sentiment: number) => !isNaN(sentiment);

export const TweetDashboardReducer: Reducer<
  ITweetDashboardState,
  TweetDashboardActionTypes
> = (state: ITweetDashboardState, action: TweetDashboardActionTypes) => {
  switch (action.type) {
    case TweetDashboardActions.ADD_TWEET:
      const tweet = action.payload;
      return {
        totalTweets: isSentimentValid(tweet.sentiment)
          ? ++state.totalTweets
          : state.totalTweets,
        totalScore: isSentimentValid(tweet.sentiment)
          ? state.totalScore + tweet.sentiment
          : state.totalScore,
        tweets:
          state.tweets.length < MAX_TWEET_BUBBLES
            ? state.tweets.concat([tweet])
            : state.tweets,
      };
    case TweetDashboardActions.CLEAR_TWEET:
      return {
        ...state,
        tweets: state.tweets.filter((tweet) => tweet.id !== action.payload),
      };
    default:
      throw new Error("Unknown dispatch type");
  }
};
