const {
  VITE_TWITTER_STATE,
  VITE_TWITTER_CLIENT_ID,
  VITE_TWITTER_CODE_VERIFIER,
} = import.meta.env;

const getTwitterOAuthUrl = (redirectUri: string) => {
  const rootUrl = import.meta.env.VITE_TWITTER__AUTH_CODE_BASE_URL;
  const options = {
    redirect_uri: redirectUri,
    client_id: VITE_TWITTER_CLIENT_ID,
    state: VITE_TWITTER_STATE,
    response_type: "code",
    code_challenge: VITE_TWITTER_CODE_VERIFIER,
    code_challenge_method: "plain",
    scope: ["users.read", "offline.access"].join(" "),
  };
  const qs = new URLSearchParams(options).toString();
  return `${rootUrl}?${qs}`;
};

export default getTwitterOAuthUrl;
