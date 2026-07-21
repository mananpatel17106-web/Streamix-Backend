import mongoose, { Schema } from "mongoose";

const subscriptionSchema = new Schema(
  {
    subscriber: {
      type: Schema.Types.ObjectId, // User who subscribes
      ref: "User",
      required: true,
    },

    channel: {
      type: Schema.Types.ObjectId, // Channel being subscribed to
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Prevent duplicate subscriptions
subscriptionSchema.index(
  {
    subscriber: 1,
    channel: 1,
  },
  {
    unique: true,
  }
);

// Faster queries
subscriptionSchema.index({ subscriber: 1 });
subscriptionSchema.index({ channel: 1 });

export const Subscription = mongoose.model(
  "Subscription",
  subscriptionSchema
);