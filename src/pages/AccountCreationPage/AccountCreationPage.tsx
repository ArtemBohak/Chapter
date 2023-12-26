import { FC } from "react";

import BlockAuth from "@/src/components/BlockAuth/BlockAuth";
import FormCreateAccount from "./components/FormCreateAccount/FormCreateAccount";
import { CookiesToaster } from "@/src/components";

const AccountCreationPage: FC = () => {
  return (
    <>
      <BlockAuth heading="Create account">
        <FormCreateAccount />
      </BlockAuth>
      <CookiesToaster />
    </>
  );
};

export default AccountCreationPage;
