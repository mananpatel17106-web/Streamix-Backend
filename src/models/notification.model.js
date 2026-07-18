import mongoose, { Schema } from "mongoose";

const notificationSchema = new Schema(
  {
    receiver: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    sender: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    type: {
      type: String,
      enum: [
        "like",
        "comment",
        "subscribe",
        "upload",
      ],
      required: true,
    },

    message: {
      type: String,
      trim: true,
      required: true,
    },

    video: {
      type: Schema.Types.ObjectId,
      ref: "Video",
      default: null,
    },

    comment: {
      type: Schema.Types.ObjectId,
      ref: "Comment",
      default: null,
    },

    isRead: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export const Notification = mongoose.model(
  "Notification",
  notificationSchema
);