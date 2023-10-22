import { EndpointsEnum, api } from "@/src/axios";
import { BlockAuth } from "@/src/components";
import { FC } from "react";

const RestorePage: FC = () => {
  return (
    <BlockAuth
      heading="Sign up"
      showBottomText={true}
      typePageText="Create account"
    >
      <button
        onClick={() => {
          api.post(EndpointsEnum.GOOGLE_RESTORE);
        }}
      >
        RESTORE
      </button>
    </BlockAuth>
  );
};

export default RestorePage;
