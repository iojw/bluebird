export interface ITweetEvent {
  message: ITweetResponse;
}

export interface ITweetResponse {
  text: string;
  user: {
    screen_name: string;
    name: string;
    profile_image_url_https: string;
  };
  id_str: string;
  id: number;
  created_at: string;
  timestamp_ms: string;
  favorite_count: number;
  retweet_count: number;
  lang: string;
  description: string;
  verified: boolean;
}

export interface ITweet {
  url: string;
  name: string;
  username: string;
  text: string;
  time: number;
  sentiment: number;
  id: number;
}
