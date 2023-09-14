import { FC } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { OAuthContainerProps } from "./OAuth.type";

const OAuthContainer: FC<OAuthContainerProps> = ({ children }) => {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      {children}
    </GoogleOAuthProvider>
  );
};

export default OAuthContainer;
