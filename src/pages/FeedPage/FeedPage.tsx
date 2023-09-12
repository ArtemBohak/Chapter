import { FC } from "react";
import { useAppSelector } from "@/src/redux/hooks";

const FeedPage: FC = () => {
  const userSlice = useAppSelector((state) => state.userSlice);

  return <h1>Feed page - {userSlice.user.firstName}</h1>;
};

export default FeedPage;
