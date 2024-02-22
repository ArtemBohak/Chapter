export interface ISwitch {
  label: string;
  isChecked: boolean;
  name:
    | "newPostNotification"
    | "subscriptionNotification"
    | "likesNotification"
    | "commentsNotification";
  classNames?: string;
}
