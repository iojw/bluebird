import {ITweet} from "../interfaces";

export enum TweetDashboardActions {
  ADD_TWEET = "ADD_TWEET",
  CLEAR_TWEET = "CLEAR_TWEET",
}

export interface IAddTweetAction {
  type: TweetDashboardActions.ADD_TWEET;
  payload: ITweet;
}

export interface IClearTweetAction {
  type: TweetDashboardActions.CLEAR_TWEET;
  payload: number;
}

export type TweetDashboardActionTypes = IAddTweetAction | IClearTweetAction;
