// import { FC, useRef, useState } from "react";

// import { formatDate } from "@/src/utils";
// import "@/src/extensions/string.extensions";
// import { useFindById } from "@/src/hooks";
// import { useAppSelector } from "@/src/redux/hooks";
// import { FeedProps, TextSize } from "./Feed.type";
// import { Title } from "../SocialButton/SocialButton.type";
// import styles from "./Feed.module.scss";

// import { IconEnum } from "@/src/components/Icon";
// import { UIbutton } from "@/src/components";
// import FeedCommentsForm from "../FeedCommentsForm/FeedCommentsForm";
// import SocialButton from "../SocialButton/SocialButton";

// const Feed: FC<FeedProps> = ({
//   id,
//   name,
//   postCreatedAt,
//   avatar,
//   text,
//   img,
//   totalLikes,
//   totalShares,
//   totalComments,
//   followersList,
//   likesList,
//   commentsList,
//   sharedList,
// }) => {
//   const { user } = useAppSelector((state) => state.userSlice);
//   const { current: screenSize } = useRef(window.innerWidth);
//   const [isFollowing] = useFindById(user.id + 1 + "", followersList);

//   const [isFollow, setIsFollow] = useState(isFollowing);
//   const [isReadMore, setIsReadMore] = useState(true);

//   const formattedPostTime = formatDate(postCreatedAt);
//   const { sentenceSize, wordSize } =
//     screenSize < 769
//       ? { sentenceSize: TextSize.MOB_SENTENCE, wordSize: TextSize.MOB_WORD }
//       : { sentenceSize: TextSize.SENTENCE, wordSize: TextSize.WORD };
//   const isMobDimension = screenSize < 769;

//   const onHandleFollowing = () => {
//     setIsFollow(!isFollow);
//   };

//   const onHandleReadMore = () => setIsReadMore(!isReadMore);

//   const renderText =
//     isReadMore && text.length > wordSize ? text.limit(sentenceSize) : text;

//   const renderReadMoreBtn =
//     text.length > wordSize && isReadMore ? (
//       <UIbutton
//         variant="text"
//         onClick={onHandleReadMore}
//         dataAutomation="clickButton"
//         className={`${styles["content__text-button"]} ${styles["feed-btn"]} ${styles["btn"]}`}
//       >
//         Read more...
//       </UIbutton>
//     ) : null;

//   return (
//     <div className={styles["feed"]}>
//       <div className={styles["avatar-desc"]}>
//         <img src={avatar} alt="" width="78" />
//       </div>
//       <div className={styles["avatar-tab"]}>
//         <img src={avatar} alt="" width="68" />
//       </div>
//       <div className={styles["content"]}>
//         <div className={styles["content__title"]}>
//           <div className={styles["avatar"]}>
//             <img src={avatar} alt="" width="38" />
//           </div>
//           <div className={styles["content__title-text"]}>
//             <h5>{name}</h5>
//             <p>{formattedPostTime}</p>
//           </div>
//           <UIbutton
//             variant={isFollow ? "outlined" : "contained"}
//             dataAutomation="clickButton"
//             onClick={onHandleFollowing}
//             className={`${styles["content__title-button"]} ${styles["btn"]}`}
//           >
//             {isFollow ? "Unfollow" : "Follow"}
//           </UIbutton>
//         </div>
//         <div className={styles["content__text"]}>
//           <p>{renderText}</p>
//           {renderReadMoreBtn}
//         </div>
//         <div className={styles["content__image"]}>
//           <div>
//             <img src={img} alt="" width="640" />
//             <div className={styles["content__social"]}>
//               <SocialButton
//                 userId={user.id + 1 + ""}
//                 postId={id}
//                 title={Title.LIKES}
//                 total={totalLikes}
//                 clickedData={likesList}
//                 iconType={IconEnum.Likes}
//                 size={isMobDimension ? 24 : 28}
//               />
//               <SocialButton
//                 postId={id}
//                 userId={user.id + 1 + ""}
//                 title={Title.SHARED}
//                 total={totalShares}
//                 clickedData={sharedList}
//                 iconType={IconEnum.Share}
//                 size={isMobDimension ? 22 : 24}
//               />
//               <SocialButton
//                 userId={user.id + 1 + ""}
//                 postId={id}
//                 title={Title.COMMENTS}
//                 total={totalComments}
//                 clickedData={commentsList}
//                 iconType={IconEnum.Comments}
//                 size={isMobDimension ? 22 : 24}
//               />
//             </div>
//           </div>
//         </div>
//         <FeedCommentsForm postId={id} />
//       </div>
//     </div>
//   );
// };

// export default Feed;
