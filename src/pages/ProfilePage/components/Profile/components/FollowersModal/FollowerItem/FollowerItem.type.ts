
export type FollowerProps = {
    follower: {
        id: number;
        avatarUrl: string;
        firstName: string;
        lastName: string;
        
    }
    loadingStates: {}[] | [{}];
   unsubscribe: (id: number) => Promise<void>;
}