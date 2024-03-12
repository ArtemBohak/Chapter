import { FC, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { AxiosError, AxiosResponse } from "axios";

import { EndpointsEnum, api } from "@/src/axios";
import { useErrorBoundary } from "@/src/hooks";
import { PostType } from "@/src/types";
import styles from "./GuestPostPage.module.scss";

import { Animation, Post, PostSkeleton } from "@/src/components";

const GuestPostPage: FC = () => {
  const setErrorBoundary = useErrorBoundary();
  const nodeRef = useRef(null);
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

  const renderPost = post ? (
    <Post nodeRef={nodeRef} setPost={setPost} {...post} />
  ) : (
    <div ref={nodeRef}>
      <PostSkeleton className={styles["skeleton"]} />
    </div>
  );

  return (
    <section className={styles["post"]}>
      <div className={styles["container"]}>
        <Animation nodeRef={nodeRef} in={!!post}>
          {renderPost}
        </Animation>
      </div>
    </section>
  );
};

export default GuestPostPage;
