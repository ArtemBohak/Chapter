import { FC, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AxiosError, AxiosResponse } from "axios";
import { EndpointsEnum, api } from "@/src/axios";
import { useErrorBoundary } from "@/src/hooks";
import { PostType, links } from "@/src/types";
import styles from "./GuestPostPage.module.scss";

import { Post, PostSkeleton } from "@/src/components";

const GuestPostPage: FC = () => {
  const [post, setPost] = useState<PostType | null>(null);

  const setErrorBoundary = useErrorBoundary();
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

            if (e.response?.status === 404) navigate(links.HOME);
          }
        });
  }, [id, navigate, setErrorBoundary]);

  const renderPost = post ? (
    <Post setPost={setPost} {...post} classNames={styles["post"]} />
  ) : (
    <PostSkeleton className={styles["skeleton"]} />
  );

  return (
    <section className={styles["post-section"]}>
      <div className={styles["container"]}>{renderPost}</div>
    </section>
  );
};

export default GuestPostPage;
