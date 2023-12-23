import { FC } from "react";

import BlockAuth from "@/src/components/BlockAuth/BlockAuth";
import FormCreateAccount from "./components/FormCreateAccount/FormCreateAccount";

const AccountCreationPage: FC = () => {
  return (
    <>
      <BlockAuth heading="Create account">
        <FormCreateAccount />
      </BlockAuth>
    </>
  );
};

export default AccountCreationPage;
