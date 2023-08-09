import { FC } from "react";

import LayoutContentCenter from "@/src/layouts/LayoutContentCenter/LayoutContentCenter";
import FormCreateAccount from "./components/FormCreateAccount/FormCreateAccount";

const AccountCreationPage: FC = () => {
  return (
    <LayoutContentCenter heading="Create account">
      <FormCreateAccount />
    </LayoutContentCenter>
  );
};

export default AccountCreationPage;
