export type OAuthProps = {
  className?: string;
  size?: number;
  type: "facebook" | "google" | "twitter";
  url: string;
};

export type UseOAuth = {
  url: string;
};

export enum GoogleApiEndPoints {
  TOKEN = "/token",
}
