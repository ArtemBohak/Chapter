
import { FC } from 'react'
import styles from './GuestPosts.module.scss'
import { Avatar, CommentsButton, LikesButton, PostComments, PostDate, PostImage, PostText, PostTitle, UserNickName } from '@/src/components';
import { useGuestContext } from '../../context';

const GuestPosts: FC = () => {

    const { guestPostsList, enemyData } = useGuestContext();

    return (
        <div className={styles["posts-wrapper"]}>
            {guestPostsList.length > 0 ? guestPostsList.map((post) => (
                <div className={styles["user-post"]}>
                    <div className="flex items-center justify-between w-full relative">
                        <div className="flex gap-3 items-center">
                            <Avatar avatar={enemyData?.avatarUrl || null} />
                            <UserNickName nickName={enemyData?.nickName || ""} />
                        </div>
                    </div>
                    <div className={styles["user-post__image"]}><PostImage imgUrl={post.imgUrl} /></div>
                    <div className="flex justify-between">
                        <div className={styles["user-post__activity-icons"]}>
                            <LikesButton id={post.id} likesList={[]} totalLikes={0} />
                            <CommentsButton textValue={""} id={""} totalComments={0} />
                        </div>
                        <PostDate date={post.updatedAt} />
                    </div>
                    <PostTitle title={post.title} />
                    <PostText caption={post.caption} />
                    <PostComments id={post.id} totalComments={0} />
                    {/* <PostDate date={post.createdAt}/> */}
                </div>
            )) : <div className={styles["user-post__skeleton"]}>Loading</div>}
        </div>
    );
};

export default GuestPosts