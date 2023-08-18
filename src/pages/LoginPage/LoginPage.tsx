import { FC } from "react";

import LoginPageForm from "./components/LoginPageForm/LoginPageForm";
import PublicLayout from "@/src/layouts/PublicLayout/PublicLayout";
import BlockAuth from "@/src/components/BlockAuth/BlockAuth";


const LoginPage: FC = () => {
  return (
    <PublicLayout>
      <BlockAuth
        heading="Log in"
        showBottomText={true}
        bottomTextCurrentPage="Log in"
        className="pt-2 pb-4 md:pt-[100px] md:pb-8"
      >
        <LoginPageForm />
      </BlockAuth>
    </PublicLayout>
  );
};

export default LoginPage;
