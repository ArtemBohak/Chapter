import { Icon, IconEnum, UIbutton, UserAvatar } from "@/src/components";
import { FC } from "react";
import styles from "./ProfileBlock.module.scss";
const Profile: FC = () => {
  return (
    <div className={styles["profile-wrapper"]}>
      <div className={styles["info-block"]}>
        <UserAvatar
          className={styles["profile-avatar"]}
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpEdHmDwSq2dcc7Dnx1n90oVBJkwKoEoT7pbHxK8RNWYX8H89_ksyAd3c7C2aXxZsiwNE&usqp=CAU"
          alt={"avatar"}
        />
        <div className={styles["info-block__text"]}>
          <h3 className="">Aang Airbender</h3>
          <h3 className={styles["nickname"]}>@Avatar65</h3>
          <h4 className="text-xs text-grey-1000 flex items-end font-normal">
            <Icon width={20} icon={IconEnum.Location} />
            Southern Air Temple
          </h4>
          <div className="flex text-sm gap-4 text-center">
            <p>
              <span className="text-black font-bold">765</span> followers
            </p>
            <p>
              <span className="text-black font-bold">300</span> follow
            </p>
          </div>
        </div>
        <p className={styles["info-block__status"]}>
          Embracing life's journey with open arms and a heart full of gratitude.
          Chasing dreams, one step at a time, with unwavering determination.
          Spreading positivity and kindness wherever I go, making the world a
          better place.
        </p>
      </div>
      <div className={styles["buttons-block"]}>
        <UIbutton
          icon={IconEnum.AddPost}
          className={styles["button-add-post"]}
          isCustomIcon
          fullWidth
          dataAutomation="addPost"
        >
          Add post
        </UIbutton>

        <UIbutton
          icon={IconEnum.EditProfile}
          className={styles["button-edit-profile"]}
          fullWidth={true}
          variant="outlined"
          color="primary"
          dataAutomation="editProfile"
        >
          Edit profile
        </UIbutton>
      </div>
    </div>
  );
};

export default Profile;
