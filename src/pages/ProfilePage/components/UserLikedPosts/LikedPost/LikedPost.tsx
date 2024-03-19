import { EndpointsEnum, followApi } from '@/src/axios'
import { Avatar, CommentsButton, LikesButton, PostComments, PostDate, PostImage, PostText, PostTitle, UIbutton, UserNickName } from '@/src/components'
import { FC, useState } from 'react'
import { Link } from 'react-router-dom'
import styles from '../Liked.module.scss'
import { LikedPostProps } from '../UserLikedPost.type'

const LikedPost: FC<LikedPostProps> = ({ post }) => {

    const [commentsIsHide, setCommentsIsHide] = useState(true);

    // const fetchUsersWhoLikedPosts = async (id: number) => {
    //     const response = await api.get(`posts/users-who-liked-post/${id}`);

    // };
    // useEffect(() => {
    //     fetchUsersWhoLikedPosts(post.postId);
    // }, [])

    return (
        <div key={post.postId} className={styles["user-post"]}>
            <div className="flex items-center justify-between gap-2 w-full">
                <Link
                    className={styles["user-post__link"]}
                    to={post.author.id != undefined ? `/${post.author.id}` : ""}
                >
                    <Avatar avatarUrl={post.author.avatar} />
                    <UserNickName nickName={post.author.nickName} />
                </Link>
                <UIbutton
                    variant={post.isSubscribeToAuthor ? "outlined" : "contained"}
                    dataAutomation={"subscribe-button"}
                    onClick={() => followApi(post.author.id)}
                >
                    {post.isSubscribeToAuthor ? "unfollow" : "follow"}
                </UIbutton>
            </div>
            <div className={styles["user-post__image"]}>
                <PostImage imgUrl={post.imgUrl} />
            </div>
            <div className="flex justify-between">
                <div className={styles["user-post__activity-icons"]}>
                    <LikesButton
                        id={post.postId}
                        userIds={post.userIds}
                        url={EndpointsEnum.POST_LIKE}
                    />
                    <CommentsButton
                        textValue={""}
                        id={""}
                        commentsCount={post.commentsCount}
                        postId={post.postId}
                    />
                </div>
                <PostDate createAt={post.createAt} />
            </div>
            <PostTitle title={post.title} />
            <PostText caption={post.caption} />
            <PostComments
                postId={post.postId}
                commentsCount={post.commentsCount}
                comments={post.comments}
                setCommentsIsHide={setCommentsIsHide}
                commentsIsHide={commentsIsHide}
            />
        </div>
    )
}

export default LikedPost