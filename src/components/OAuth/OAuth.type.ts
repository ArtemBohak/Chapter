export type OAuthProps = {
  className?: string;
  size?: number;
  url?: string;
  facebookUxMode?: boolean;
  googleUxMode?: "popup" | "redirect";
  type: "facebook" | "google" | "twitter";
};

export type UseOAuthProps = Pick<OAuthProps, "url" | "googleUxMode" | "type">;

export type OAuthResponse = { data: object };

export enum OAuthApiEndPoints {
  GOOGLE_TOKEN = "/token",
}
