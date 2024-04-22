import { FC, useEffect, useState } from 'react'
import styles from '../GuestPosts.module.scss'
import { Avatar, CommentsButton, LikesButton, PostComments, PostDate, PostImage, PostText, PostTitle, UserNickName } from '@/src/components'
import { useGuestContext } from '../../../context';
import { GuestPostProps } from './GuestPost.type';
import { EndpointsEnum, api } from '@/src/axios';
import { useParams } from 'react-router-dom';
import GuestFollowButton from '../../GuestFollowButton/GuestFollowButton';

const GuestPost: FC<GuestPostProps> = ({ post }) => {
    const { enemyData, setGuestPostsList } = useGuestContext();
    const [commentsList, setComentsList] = useState([])
    const [commentsIsHide, setCommentsIsHide] = useState(true);
    const { Id } = useParams();


    const getComments = async (id: number | string) => {
        const response = await api.get(`/comments/comments/${id}`);
        setComentsList(response.data);
        console.log(response.data)
    };

    useEffect(() => {
        getComments(post.postId);
    }, []);
    return (
        <li className={styles["user-post"]} key={post.postId}>
            <div className="flex items-center justify-between w-full relative">
                <div className="flex gap-3 items-center">
                    <Avatar avatarUrl={enemyData?.avatarUrl || null} />
                    <UserNickName nickName={enemyData?.nickName || ""} />
                </div>
                <GuestFollowButton id={Id} isSubscribeToAuthor={enemyData && enemyData.isSubscribed} />
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
                        postId={post.postId}
                        commentsCount={commentsList.length}
                    />
                </div>
                <PostDate createAt={post.updatedAt} />
            </div>
            <PostTitle title={post.title} />
            <PostText caption={post.caption} />
            <PostComments
                setPosts={setGuestPostsList}
                postId={post.postId}
                commentsCount={commentsList.length}
                comments={post.comments}
                setCommentsIsHide={setCommentsIsHide}
                commentsIsHide={commentsIsHide}
            />
            {/* <PostDate date={post.createdAt}/> */}
        </li>
    )
}

export default GuestPost