import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import styles from "./PostPage.module.scss";
import { Post } from "@/src/components";

import temp from "./assets/temp.png";
import { IPost } from "@/src/types";
const list = [1, 2, 3, 168];
const feeds = {
  id: 1,
  avatar: null,
  nickName: "@Jgreen",
  followList: list,
  image: temp,
  likesList: list,
  totalLikes: 101,
  totalComments: 101,
  date: Date.now(),
  firstName: "Jennifer",
  lastName: "Green",
  title: "Harry Potter and the Philosopher's Stone my thoughts ",
  text: "Ten years pass and Harry, along with his cousin Dudley, are about to turn eleven. While on Dudley’s birthday trip to the zoo Harry somehow communicates with a snake. Dudley is astonished by how the snake is acting and starts prodding the glass to the enclosure, Harry notes that odd things happen around him all the time and that’s why Dudley and he don’t get along, besides the fact that Harry’s Aunt and Uncle treat him terribly. Harry gets blamed for Dudley falling into the enclosure after the glass surrounding it disappears. When they all get back home Vernon Dursley shoves Harry into his “room” which is a cupboard under their stairs. One day in July Harry gets the mail and notices that there is a letter for him. It’s addressed to Mr. H. Potter, the Cupboard under the Stairs 4 Privet Drive, Little Whining, Surrey. Vernon decides to take the family on a trip to get away from it all.",
};

const PostPage: FC = () => {
  const { postId } = useParams();
  const [post, setPost] = useState<IPost | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setPost(feeds);
      setIsLoading(false);
      console.log(postId);
    }, 1000);
  }, [postId]);
  return (
    <section className={styles["post"]}>
      <div className={styles["post__container"]}>
        {post && <Post pageVariant="post" {...post} />}
      </div>
    </section>
  );
};

export default PostPage;
