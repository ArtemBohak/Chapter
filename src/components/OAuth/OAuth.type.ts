export type OAuthProps = {
  className?: string;
  size?: number;
  url?: string;
  facebookMode?: boolean;
  googleMode?: "popup" | "redirect";
  type: "facebook" | "google" | "twitter";
};

export type UseOAuthProps = Pick<
  OAuthProps,
  "url" | "facebookMode" | "googleMode" | "type"
>;

export type GoogleOAuthProps = { mode?: "popup" | "redirect" } & OAuthProps;

export type FacebookOAuthProps = { mode?: boolean } & OAuthProps;

export enum OAuthApiEndPoints {
  GOOGLE_TOKEN = "/token",
}
