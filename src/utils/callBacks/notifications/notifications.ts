import { dataFindIndex } from "../helpers";

export const notificationsCB =
  <T>(newNotifications: Array<T>, key: string) =>
  (notifications: Array<T>) => {
    let notificationsC = [...notifications];

    for (const newNotification of newNotifications) {
      const index = dataFindIndex<T>(
        notificationsC,
        newNotification,
        key as keyof T
      );

      if (index !== -1) continue;

      notificationsC = [newNotification, ...notificationsC];
    }
    return notificationsC;
  };
