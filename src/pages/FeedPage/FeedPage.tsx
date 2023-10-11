import { FC } from "react";
import { useAppSelector } from "@/src/redux/hooks";
import TokenService from "@/src/services/token";

const FeedPage: FC = () => {
  const userSlice = useAppSelector((state) => state.userSlice);

  return (
    <>
      <h1>Feed page - {userSlice.user.firstName}</h1>
      <button
        onClick={async () => {
          const response = await TokenService.refreshToken();
          console.log(response);
        }}
      >
        CLICK
      </button>
    </>
  );
};

export default FeedPage;
