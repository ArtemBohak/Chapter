import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AxiosError, AxiosResponse } from "axios";

import { EndpointsEnum, api } from "@/src/axios";
import { useErrorBoundary } from "@/src/hooks";
import { PostType } from "@/src/types";
import styles from "./GuestPostPage.module.scss";

import { Post, PostSkeleton } from "@/src/components";

const GuestPostPage: FC = () => {
  const setErrorBoundary = useErrorBoundary();
  const [post, setPost] = useState<PostType | null>(null);
  const { id } = useParams();

  useEffect(() => {
    api
      .get(EndpointsEnum.GUEST_POST + id)
      .then(({ data }: AxiosResponse<PostType>) => setPost(data))
      .catch((e) => {
        if (e instanceof AxiosError) {
          setErrorBoundary(e);
        }
      });
  }, [id, setErrorBoundary]);

  return (
    <section className={styles["post"]}>
      <div className={styles["container"]}>
        {post ? (
          <Post setPost={setPost} {...post} />
        ) : (
          <PostSkeleton className={styles["skeleton"]} />
        )}
      </div>
    </section>
  );
};

export default GuestPostPage;
