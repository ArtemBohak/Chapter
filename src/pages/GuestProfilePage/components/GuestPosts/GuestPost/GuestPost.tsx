import { FC, useEffect, useState } from 'react'
import styles from '../GuestPosts.module.scss'
import { Avatar, CommentsButton, LikesButton, PostComments, PostDate, PostImage, PostText, PostTitle, UserNickName } from '@/src/components'
import { useGuestContext } from '../../../context';
import { GuestPostProps } from './GuestPost.type';
import { EndpointsEnum, api } from '@/src/axios';

const GuestPost: FC<GuestPostProps> = ({ post }) => {
    const { enemyData } = useGuestContext();
    const [commentsList, setComentsList] = useState([])
    const [commentsIsHide, setCommentsIsHide] = useState(true);

    const getComments = async (id: number | string) => {
        const response = await api.get(`/comments/comments/${id}`);

        setComentsList(response.data);
        console.log(response.data)
    };

    useEffect(() => {
        getComments(post.id);

    }, []);
    return (
        <div className={styles["user-post"]} key={post.id}>
            <div className="flex items-center justify-between w-full relative">
                <div className="flex gap-3 items-center">
                    <Avatar avatarUrl={enemyData?.avatarUrl || null} />
                    <UserNickName nickName={enemyData?.nickName || ""} />
                </div>
            </div>
            <div className={styles["user-post__image"]}>
                <PostImage imgUrl={post.imgUrl} />
            </div>
            <div className="flex justify-between">
                <div className={styles["user-post__activity-icons"]}>
                    <LikesButton
                        id={post.id}
                        userIds={[]}
                        url={EndpointsEnum.POST_LIKE}
                    />
                    <CommentsButton
                        textValue={""}
                        id={""}
                        postId={post.id}
                        commentsCount={commentsList.length}
                    />
                </div>
                <PostDate createAt={post.updatedAt} />
            </div>
            <PostTitle title={post.title} />
            <PostText caption={post.caption} />
            <PostComments
                postId={post.id}
                commentsCount={commentsList.length}
                comments={commentsList}
                setCommentsIsHide={setCommentsIsHide}
                commentsIsHide={commentsIsHide}
            />
            {/* <PostDate date={post.createdAt}/> */}
        </div>
    )
}

export default GuestPost