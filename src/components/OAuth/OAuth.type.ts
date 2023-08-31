export type OAuthProps = {
  className?: string;
  size?: number;
  url?: string;
};

export type GoogleOAuthProps = { mode?: "popup" | "redirect" } & OAuthProps;

export type FacebookOAuthProps = { mode?: boolean } & OAuthProps;

export enum OAuthApiEndPoints {
  GOOGLE_TOKEN = "/token",
}
