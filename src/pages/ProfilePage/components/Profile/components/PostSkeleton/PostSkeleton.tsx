import ContentLoader, { IContentLoaderProps } from "react-content-loader";
import { JSX } from "react/jsx-runtime";
import styles from "./PostSkeleton.module.scss";

const PostSkeleton = (props: JSX.IntrinsicAttributes & IContentLoaderProps) => {
  const parentWidth = Math.min(window.innerWidth, 776); // Set the maximum width
  const parentHeight = window.innerHeight * 0.8; // Adjust as needed
  const aspectRatio = 776 / 800; // Aspect ratio of the loader

  console.log(parentWidth)

  return (
    <div className={styles['post-skeleton__wrapper']} style={{ width: '100%', maxWidth: `${parentWidth}px`, height: `${parentHeight}px` }}>
      <ContentLoader
        speed={4}
        width={'100%'}
        height={parentHeight}
        viewBox={`0 0 ${parentWidth} ${parentHeight * aspectRatio}`}
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
    </div>
  );
}

export default PostSkeleton;