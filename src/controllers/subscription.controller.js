import mongoose, { isValidObjectId } from "mongoose";
import { User } from "../models/user.model.js";
import { Subscription } from "../models/subscription.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const toggleSubscription = asyncHandler(async (req, res) => {
  const { channelId } = req.params;

  if (!isValidObjectId(channelId)) {
    throw new ApiError(400, "Invalid Channel Id");
  }

  if (channelId === req.user._id.toString()) {
    throw new ApiError(400, "You cannot subscribe to your own channel");
  }

  const existedSubscription = await Subscription.findOne({
    subscriber: req.user._id,
    channel: channelId,
  });

  let subscribed = false;

  if (existedSubscription) {
    await existedSubscription.deleteOne();
  } else {
    await Subscription.create({
      subscriber: req.user._id,
      channel: channelId,
    });

    subscribed = true;
  }

  const subscribersCount = await Subscription.countDocuments({
    channel: channelId,
  });

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        subscribed,
        subscribersCount,
      },
      subscribed ? "Subscribed successfully" : "Unsubscribed successfully"
    )
  );
});

// controller to return subscriber list of a channel
const getUserChannelSubscribers = asyncHandler(async (req, res) => {
  const { channelId } = req.params;

  if (!isValidObjectId(channelId)) {
    throw new ApiError(400, "Invalid Channel Id");
  }

  const subscribers = await Subscription.aggregate([
    {
      $match: {
        channel: new mongoose.Types.ObjectId(channelId),
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "subscriber",
        foreignField: "_id",
        as: "subscriber",
        pipeline: [
          {
            $project: {
              fullName: 1,
              username: 1,
              avatar: 1,
            },
          },
        ],
      },
    },
    {
      $addFields: {
        subscriber: {
          $first: "$subscriber",
        },
      },
    },
  ]);
  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        subscribers,
        "Channel subscribers fetched successfully"
      )
    );
});

// controller to return channel list to which user has subscribed
const getSubscribedChannels = asyncHandler(async (req, res) => {
  const { subscriberId } = req.params;

  if (!isValidObjectId(subscriberId)) {
    throw new ApiError(400, "Invalid Subscriber Id");
  }

  const subscribedChannels = await Subscription.aggregate([
    {
      $match: {
        subscriber: new mongoose.Types.ObjectId(subscriberId),
      },
    },

    {
      $lookup: {
        from: "users",
        localField: "channel",
        foreignField: "_id",
        as: "channel",
        pipeline: [
          {
            $lookup: {
              from: "subscriptions",
              localField: "_id",
              foreignField: "channel",
              as: "subscribers",
            },
          },

          {
            $lookup: {
              from: "videos",
              localField: "_id",
              foreignField: "owner",
              as: "latestVideo",
              pipeline: [
                {
                  $match: {
                    isPublished: true,
                  },
                },

                {
                  $sort: {
                    createdAt: -1,
                  },
                },

                {
                  $limit: 1,
                },

                {
                  $project: {
                    _id: 1,
                    title: 1,
                    thumbnail: 1,
                    views: 1,
                    createdAt: 1,
                    duration: 1,
                  },
                },
              ],
            },
          },

          {
            $addFields: {
              subscribersCount: {
                $size: "$subscribers",
              },

              latestVideo: {
                $first: "$latestVideo",
              },
            },
          },

          {
            $project: {
              _id: 1,
              fullName: 1,
              username: 1,
              avatar: 1,
              coverImage: 1,
              subscribersCount: 1,
              latestVideo: 1,
            },
          },
        ],
      },
    },

    {
      $addFields: {
        channel: {
          $first: "$channel",
        },
      },
    },

    {
      $project: {
        _id: 1,
        subscriber: 1,
        channel: 1,
        createdAt: 1,
      },
    },
  ]);

  return res.status(200).json(
    new ApiResponse(
      200,
      subscribedChannels,
      "Subscribed channels fetched successfully"
    )
  );
});

export { toggleSubscription, getUserChannelSubscribers, getSubscribedChannels };
