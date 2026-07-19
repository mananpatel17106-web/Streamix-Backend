import mongoose from "mongoose";
import { Notification } from "../models/notification.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const getNotifications = asyncHandler(async (req, res) => {
  const notifications = await Notification.find({
    receiver: req.user._id,
  })
    .populate("sender", "fullName username avatar")
    .populate("video", "title thumbnail")
    .sort({ createdAt: -1 });

  return res.status(200).json(
    new ApiResponse(
      200,
      notifications,
      "Notifications fetched successfully"
    )
  );
});

const markAsRead = asyncHandler(async (req, res) => {
  const { notificationId } = req.params;

  if (!mongoose.isValidObjectId(notificationId)) {
    throw new ApiError(400, "Invalid notification id");
  }

  const notification = await Notification.findOneAndUpdate(
    {
      _id: notificationId,
      receiver: req.user._id,
    },
    {
      isRead: true,
    },
    {
      new: true,
    }
  );

  if (!notification) {
    throw new ApiError(404, "Notification not found");
  }

  return res.status(200).json(
    new ApiResponse(
      200,
      notification,
      "Notification marked as read"
    )
  );
});

const markAllAsRead = asyncHandler(async (req, res) => {
  await Notification.updateMany(
    {
      receiver: req.user._id,
      isRead: false,
    },
    {
      $set: {
        isRead: true,
      },
    }
  );

  return res.status(200).json(
    new ApiResponse(
      200,
      {},
      "All notifications marked as read"
    )
  );
});

const deleteNotification = asyncHandler(async (req, res) => {
  const { notificationId } = req.params;

  if (!mongoose.isValidObjectId(notificationId)) {
    throw new ApiError(400, "Invalid notification id");
  }

  const notification = await Notification.findOneAndDelete({
    _id: notificationId,
    receiver: req.user._id,
  });

  if (!notification) {
    throw new ApiError(404, "Notification not found");
  }

  return res.status(200).json(
    new ApiResponse(
      200,
      {},
      "Notification deleted successfully"
    )
  );
});

const clearNotifications = asyncHandler(async (req, res) => {
  await Notification.deleteMany({
    receiver: req.user._id,
  });

  return res.status(200).json(
    new ApiResponse(200, {}, "Notifications cleared successfully")
  );
});

export {
  getNotifications,
  markAsRead,
  markAllAsRead,
  deleteNotification,
  clearNotifications
};