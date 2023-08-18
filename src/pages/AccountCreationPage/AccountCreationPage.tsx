import { FC } from "react";

import BlockAuth from "@/src/components/BlockAuth/BlockAuth";
import PublicLayout from "@/src/layouts/PublicLayout/PublicLayout";
import FormCreateAccount from "./components/FormCreateAccount/FormCreateAccount";

const AccountCreationPage: FC = () => {
  return (
    <PublicLayout>
      <BlockAuth heading="Create account">
        <FormCreateAccount />
      </BlockAuth>
    </PublicLayout>
  );
};

export default AccountCreationPage;
