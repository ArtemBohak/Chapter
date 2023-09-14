import { FC, useState } from "react";
import styles from "./Feed.module.scss";

import { IconEnum } from "@/src/components/Icon";

import { Icon, UIbutton } from "@/src/components";

import userImage from "./assets/user.png";
import postImage from "./assets/image.jpg";
import CommentsForm from "../CommentsForm/CommentsForm";
const Feed: FC = () => {
  const [isLiked, setIsLiked] = useState(false);
  const [isShared, setIsShared] = useState(false);
  const [isCommented, setIsCommented] = useState(false);
  return (
    <div className={styles["feed"]}>
      <div>
        <img src={userImage} alt="" width="78" />
      </div>
      <div className={styles["feed__content-container"]}>
        <div>
          <div>
            <h5>Alex Space</h5>
            <p>11 min</p>
          </div>
          <UIbutton variant="outlined" dataAutomation="clickButton">
            Unfollow
          </UIbutton>
        </div>
        <p>
          Just finished diving into an amazing book and couldn't resist sharing
          my thoughts! 🤓📖 The narrative's compelling, the characters were
          wonderfully crafted, and the plot was so gripping that it made
          'putting the book down' an impossible task. I can safely say that it
          gave my imagination a whole new world to explore! I won't spill any
          spoilers, but here's a hint: It's a tapestry of intriguing storylines
          that intertwine in the most unexpected ways. 😏 If anyone is looking
          for a brilliant book to get lost into, stay tuned. I'll be dropping a
          hint soon. Until then, keep reading and keep exploring! 🚀 #BookLovers
          #AmReading #BookWorld #ReadersLife #PageTurner #BookwormsUnite
        </p>
        <UIbutton variant="text" dataAutomation="clickButton">
          Read more...
        </UIbutton>
        <img src={postImage} alt="" width="640" />
        <div>
          <button>
            <Icon icon={IconEnum.Likes} size={28} /> 4526
          </button>
          <button>
            <Icon icon={IconEnum.Share} size={28} /> 4526
          </button>
          <button>
            <Icon icon={IconEnum.Comments} size={28} /> 4526
          </button>
        </div>
        <CommentsForm />
      </div>
    </div>
  );
};

export default Feed;
