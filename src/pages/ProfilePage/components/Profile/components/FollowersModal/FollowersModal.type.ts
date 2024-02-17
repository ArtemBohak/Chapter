import { Dispatch, SetStateAction } from "react";


export type followersModalProps = {
    isFollowersModalOpen: boolean,
    setIsFollowersModalOpen: Dispatch<SetStateAction<boolean>>;
}

export type followersData = {
    id: number;
    avatarUrl: string;
    firstName: string;
    lastName: string;
    subscribers: {}[];
}
