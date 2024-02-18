import { FC } from "react";
import styles from "./GuestPosts.module.scss";
import {
  Avatar,
  CommentsButton,
  LikesButton,
  PostComments,
  PostDate,
  PostImage,
  PostText,
  PostTitle,
  UserNickName,
} from "@/src/components";
import { useGuestContext } from "../../context";

const GuestPosts: FC = () => {
  const { guestPostsList, enemyData } = useGuestContext();

  return (
    <div className={styles["posts-wrapper"]}>
      {guestPostsList.length > 0 ? (
        guestPostsList.map((post) => {
          return (
            <div className={styles["user-post"]} key={post.id}>
              <div className="flex items-center justify-between w-full relative">
                <div className="flex gap-3 items-center">
                  <Avatar avatarUrl={enemyData?.avatarUrl || null} />
                  <UserNickName nickName={enemyData?.nickName || ""} />
                </div>
              </div>
              <div className={styles["user-post__image"]}>
                <PostImage imgUrl={post.imgUrl} />
              </div>
              <div className="flex justify-between">
                <div className={styles["user-post__activity-icons"]}>
                  <LikesButton id={post.id} userIds={[]} />
                  <CommentsButton textValue={""} id={""} commentsCount={0} />
                </div>
                <PostDate createAt={post.updatedAt} />
              </div>
              <PostTitle title={post.title} />
              <PostText caption={post.caption} />
              <PostComments postId={post.id} commentsCount={0} comments={[]} />
              {/* <PostDate date={post.createdAt}/> */}
            </div>
          );
        })
      ) : (
        <div className={styles["user-post__skeleton"]}>Loading</div>
      )}
    </div>
  );
};

export default GuestPosts;
