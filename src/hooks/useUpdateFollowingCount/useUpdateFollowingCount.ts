import { useDispatch } from "react-redux";
import { updateUser, useAppSelector } from "@/src/redux";

export const useUpdateFollowingCount = () => {
    const dispatch = useDispatch();
    const { user } = useAppSelector((state) => state.userSlice);

    const updateFollowingCount = (isFollow: boolean) => {
        const currentFollowingCount = user.myFollowingCount ?? 0;

        const updatedCount = isFollow
            ? currentFollowingCount - 1
            : currentFollowingCount + 1;

        const updatedUser = {
            ...user,
            myFollowingCount: updatedCount,
        };

        dispatch(updateUser(updatedUser));
    };

    return { updateFollowingCount };
};

