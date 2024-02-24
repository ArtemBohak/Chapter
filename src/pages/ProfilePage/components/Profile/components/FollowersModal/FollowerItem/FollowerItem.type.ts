
export type FollowerProps = {
    follower: {
        id: number;
        avatarUrl: string;
        firstName: string;
        lastName: string;
        isSubscribed: boolean;

    }
    loadingStates: {}[] | [{}];
    unsubscribe: (id: number) => Promise<void>;
}