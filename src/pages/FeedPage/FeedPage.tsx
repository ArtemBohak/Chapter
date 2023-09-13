import { FC } from "react";

import FeedsList from "./components/FeedsList/FeedsList";
// import { useAppSelector } from "@/src/redux/hooks";

const FeedPage: FC = () => {
  // const userSlice = useAppSelector((state) => state.userSlice);

  return <FeedsList />;
};

export default FeedPage;
