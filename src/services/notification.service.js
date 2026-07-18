import { Notification } from "../models/notification.model.js";

const createNotification = async ({
  receiver,
  sender,
  type,
  message,
  video = null,
  comment = null,
}) => {
  try {
    if (!receiver || !sender) return null;

    // Don't notify yourself
    if (receiver.toString() === sender.toString()) {
      return null;
    }

    const notification = await Notification.create({
      receiver,
      sender,
      type,
      message,
      video,
      comment,
    });

    return notification;
  } catch (error) {
    console.error("Notification Error:", error.message);
    return null;
  }
};

export { createNotification };