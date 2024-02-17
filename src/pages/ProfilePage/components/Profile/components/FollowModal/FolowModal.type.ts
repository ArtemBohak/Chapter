import { Dispatch, SetStateAction } from "react";

export type followModalProps = {
    isFollowModalOpen: boolean,
    setIsFollowModalOpen: Dispatch<SetStateAction<boolean>>;
}

export type followData = {
    id: number;
    avatarUrl: string;
    firstName: string;
    lastName: string;
}

export default followModalProps;