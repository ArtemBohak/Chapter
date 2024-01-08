export type UserAvatarProps = {
  src: string;
  alt: string;
  size?: "small" | "large";
  className?: string;
  onClick?: () => void;
};
