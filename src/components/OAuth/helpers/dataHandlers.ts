import { facebookApi, getGoogleAuthCode, googleApi } from "./oAuthapi";
import {
  GoogleDataHandler,
  FacebookDataHandler,
  TwitterDataHandler,
} from "../OAuth.type";

export const googleDataHandler = async ({
  token,
  redirectUri,
  url,
  setSearchParams,
  setAuthCode,
  navigate,
}: GoogleDataHandler) => {
  try {
    const cred = await getGoogleAuthCode({
      googleCode: token,
      redirectUri,
    });

    const response = await googleApi({
      googleIdToken: cred.data.id_token,
    });

    console.log(response);

    navigate(url);
  } catch (error) {
    console.log(error);
  } finally {
    setSearchParams && setSearchParams("");
    setAuthCode && setAuthCode("");
  }
};

export const facebookDataHandler = async ({
  token,
  url,
  setSearchParams,
  setAuthCode,
  navigate,
}: FacebookDataHandler) => {
  try {
    const response = await facebookApi({
      facebookAccessToken: token,
    });
    console.log(response);
    navigate(url);
  } catch (error) {
    console.log(error);
  } finally {
    setSearchParams && setSearchParams("");
    setAuthCode && setAuthCode("");
  }
};

export const twitterDataHandler = async ({
  token,
  url,
  setSearchParams,
  setAuthCode,
  navigate,
}: TwitterDataHandler) => {
  try {
    console.log("POST auth/twitter/login => ", token);
    navigate(url);
  } catch (error) {
    console.log(error);
  } finally {
    setSearchParams && setSearchParams("");
    setAuthCode && setAuthCode("");
  }
};
