export type RoomType = {
  avatarUrl: null | string;
  firstName: string;
  lastName: string;
  id: number;
  nickName: string;
  newMessage: boolean;
};

export type MessageType = {
  message: string;
  date: Date | number;
  ownerId: number;
  id: number;
};
