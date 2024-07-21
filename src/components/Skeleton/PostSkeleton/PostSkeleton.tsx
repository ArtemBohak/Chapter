import { FC } from "react";
import ContentLoader, { IContentLoaderProps } from "react-content-loader";
import { JSX } from "react/jsx-runtime";

import styles from "./PostSkeleton.module.scss";

const PostSkeleton: FC<JSX.IntrinsicAttributes & IContentLoaderProps> = ({
  className,
  ...props
}) => (
  <ContentLoader
    className={`${styles["skeleton"]} ${className}`}
    speed={4}
    width={776}
    viewBox="0 0 776 800"
    backgroundColor="#f3f3f3"
    foregroundColor="#FFC368"
    {...props}
  >
    <circle cx="8%" cy="44" r="28" />
    <rect x="14%" y="32" rx="2" ry="2" width="160" height="20" />
    <rect x="5%" y="88" rx="2" ry="2" width="90%" height="50%" />
    <rect x="5%" y="510" rx="10" ry="10" width="5%" height="20" />
    <rect x="12%" y="510" rx="10" ry="10" width="5%" height="20" />
    <rect x="80%" y="510" rx="5" ry="5" width="15%" height="20" />
    <rect x="5%" y="560" rx="5" ry="5" width="35%" height="36" />
    <rect x="5%" y="620" rx="5" ry="5" width="90%" height="160" />
  </ContentLoader>
);

export default PostSkeleton;
