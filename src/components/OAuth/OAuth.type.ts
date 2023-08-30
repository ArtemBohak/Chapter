export type OAuthProps = {
  className?: string;
  size?: number;
  url?: string;
  type: "google" | "facebook" | "twitter";
};

export type UseOAuth = {
  url: string;
};

export enum OAuthApiBaseUrl {
  TWITTER_AUTH_CODE = "https://twitter.com/i/oauth2/authorize",
}

export enum OAuthApiEndPoints {
  GOOGLE_TOKEN = "/token",
}
