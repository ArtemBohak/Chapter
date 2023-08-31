export type OAuthProps = {
  className?: string;
  size?: number;
  url?: string;
  type: "google" | "facebook" | "twitter";
};

export type UseOAuth = {
  url: string;
};

export enum OAuthApiEndPoints {
  GOOGLE_TOKEN = "/token",
}
