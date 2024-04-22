import { FC, useEffect, useState } from "react";
import { useErrorBoundary } from "@/src/hooks";
import { followApi } from "@/src/axios";
import { PostButton } from "@/src/components/Post";
import { useGuestContext } from "../../context";
import { GuestFollowButtonProps } from "./GuestFollowButton.type";
import { AxiosError } from "axios";

const GuestFollowButton: FC<GuestFollowButtonProps> = ({
    isSubscribeToAuthor,
    id,
    classNames,
}) => {
    const [isFollow, setIsFollow] = useState(isSubscribeToAuthor);
    const setErrorBoundary = useErrorBoundary();
    const [subscribeIsLoading, setSubscribeIsLoading] = useState(false)
    const { fetchEnemyUserData } = useGuestContext()

    useEffect(() => {
        setIsFollow(isSubscribeToAuthor);
    }, [isSubscribeToAuthor]);

    const onHandleClick = async () => {
        setSubscribeIsLoading(true)
        try {
            console.log(id)
            await followApi(id);
            await fetchEnemyUserData(id);
        } catch (error) {
            if (error instanceof AxiosError) {
                setErrorBoundary(error);
            }
        }
        finally {
            setSubscribeIsLoading(false)
        }
    };
    const btnVariant = isFollow ? "outlined" : "contained";
    return (
        <PostButton
            onHandleClick={onHandleClick}
            variant={btnVariant}
            className={classNames}
            aria-label="Subscribe profile button"
            isLoading={subscribeIsLoading}
        >
            {isFollow ? "Unfollow" : "Follow"}
        </PostButton>
    );
};

export default GuestFollowButton;


