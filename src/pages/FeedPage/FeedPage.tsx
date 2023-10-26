import { FC } from "react";

import { useAppSelector } from "@/src/redux";

const FeedPage: FC = () => {
  const userSlice = useAppSelector((state) => state.userSlice);

  return (
    <div className="py-[120px] px-[20px]">
      <h1>Feed page - {userSlice.user.firstName}</h1>
    </div>
  );
};

export default FeedPage;
