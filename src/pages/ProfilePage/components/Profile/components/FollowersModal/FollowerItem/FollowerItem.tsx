import { FC } from "react";
import styles from "../FollowersModal.module.scss";
import defaultAvatar from "@/src/assets/SVG/default-user-avatar.svg";
import { Link } from "react-router-dom";
import { UIbutton } from "@/src/components";
import { FollowerProps } from "./FollowerItem.type";

const FollowerItem: FC<FollowerProps> = ({
  follower,
  loadingStates,
  unsubscribe,
}) => {
  const truncatedFirstName =
    follower.firstName && follower.firstName.length > 15
      ? follower.firstName.substring(0, 15) + "..."
      : follower.firstName;
  const truncatedLastName =
    follower.firstName && follower.firstName.length > 15
      ? follower.firstName.substring(0, 15) + "..."
      : follower.firstName;

  const NameLength = truncatedFirstName && truncatedFirstName.length > 15 || truncatedLastName && truncatedLastName.length > 15;
  const ShowTitle = NameLength ? `${follower.firstName} ${follower.lastName}` : "";

  const followRule = loadingStates[follower.id] ? (follower.isSubscribed ? 'Unfollowing...' : "Following...") : (follower.isSubscribed ? "Unfollow" : "Follow");
  return (
    <li className={styles["follow-list__person"]} key={follower.id}>
      <Link
        aria-label="User profile nav link"
        className={styles["follow-list__link"]}
        to={`/${follower.id}`}
      >
        <div className={styles["follow-list__info"]}>
          <img
            className={styles["follow-list__avatar"]}
            src={follower.avatarUrl ? follower.avatarUrl : defaultAvatar}
            alt=""
          />
          <p
            title={ShowTitle}
            className={NameLength ? "flex flex-col" : "flex"}
          >
            <span>{truncatedFirstName}</span>
            &nbsp;
            <span>{truncatedLastName}</span>
          </p>
        </div>
      </Link>
      <UIbutton
        isLoading={loadingStates[follower.id] && true}
        onClick={() => unsubscribe(follower.id)}
        variant={follower.isSubscribed ? "outlined" : "contained"}
        size="small"
        dataAutomation={"Unfollow-button"}
        aria-label="Subscribe user button"
      >
        {followRule}
      </UIbutton>
    </li>
  );
};

export default FollowerItem;
