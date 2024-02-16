import { FC } from 'react'
import styles from '../FollowModal.module.scss'
import defaultAvatar from "@/src/assets/SVG/default-user-avatar.svg";
import { UIbutton } from '@/src/components';
import { Link } from 'react-router-dom';
import { FollowingProps } from './FollowingItem.type';

const FollowingItem: FC<FollowingProps> = ({ follow, loadingStates, unsubscribe }) => {

  const truncatedFirstName =
    follow.firstName && follow.firstName.length > 15
      ? follow.firstName.substring(0, 15) + "..."
      : follow.firstName;
  const truncatedLastName =
    follow.lastName && follow.lastName.length > 15
      ? follow.lastName.substring(0, 15) + "..."
      : follow.lastName;

  const NameLength = truncatedFirstName && truncatedFirstName.length > 15 || truncatedLastName && truncatedLastName.length > 15;

  const ShowTitle = NameLength ? `${follow.firstName} ${follow.lastName}` : "";

  return (
    <li key={follow.id} className={styles["follow-list__person"]}>
      <Link className={styles["follow-list__link"]} to={`/${follow.id}`}>
        <div className={styles["follow-list__info"]}>
          <img className={styles["follow-list__avatar"]} src={follow.avatarUrl ? follow.avatarUrl : defaultAvatar} alt="" />
          <p title={ShowTitle} className={NameLength ? "flex flex-col" : "flex"}>
            <span> {truncatedFirstName}</span>
            &nbsp;
            <span>{truncatedLastName}</span>
          </p>
        </div>
      </Link>
      <UIbutton
        isLoading={loadingStates[follow.id] && true}
        onClick={() => unsubscribe(follow.id)}
        size='small'
        dataAutomation={'Unfollow-button'}
      >
        {loadingStates[follow.id] ? 'Unfollowing...' : 'Unfollow'}
      </UIbutton>
    </li>
  )
}

export default FollowingItem