import { FC } from "react";
import styles from "./GuestPosts.module.scss";
import { Loader } from "@/src/components";
import { useGuestContext } from "../../context";
import GuestPost from "./GuestPost/GuestPost";

const GuestPosts: FC = () => {
  const { guestPostsList } = useGuestContext();

  return (
    <ul className={styles["posts-wrapper"]}>
      {guestPostsList.length > 0 ? (
        guestPostsList.map((post) => (
          <GuestPost post={post} />
        ))
      ) : (
        <div className={styles["user-post__skeleton"]}>
          <Loader />
        </div>
      )}
    </ul>
  );
};

export default GuestPosts;
