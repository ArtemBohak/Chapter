import { FC, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AxiosError, AxiosResponse } from "axios";

import { EndpointsEnum, api } from "@/src/axios";
import { useErrorBoundary } from "@/src/hooks";
import { PostType, links } from "@/src/types";
import styles from "./GuestPostPage.module.scss";

import { Animation, Post, PostSkeleton } from "@/src/components";

const GuestPostPage: FC = () => {
  const [post, setPost] = useState<PostType | null>(null);

  const setErrorBoundary = useErrorBoundary();
  const nodeRef = useRef(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    id &&
      api
        .get(EndpointsEnum.GET_POST + id)
        .then(({ data }: AxiosResponse<PostType>) => setPost(data))
        .catch((e) => {
          if (e instanceof AxiosError) {
            setErrorBoundary(e);
            //* handle error 404
            navigate(links.HOME);
            //*
          }
        });
  }, [id, navigate, setErrorBoundary]);

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
