import mongoose, { isValidObjectId } from "mongoose";
import { Video } from "../models/video.model.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const getAllVideos = asyncHandler(async (req, res) => {
  const {
    page = 1,
    limit = 12,
    query = "",
    sortBy = "createdAt",
    sortType = "desc",
    userId,
    category,
  } = req.query;

  if (userId && !isValidObjectId(userId)) {
    throw new ApiError(400, "Invalid User Id");
  }

  const match = {
    isPublished: true,
  };

  if (category && category.trim() && category !== "All") {
    match.category = category.trim();
  }

  if (userId) {
    match.owner = new mongoose.Types.ObjectId(userId);
  }

  const pipeline = [
    {
      $match: match,
    },

    {
      $lookup: {
        from: "users",
        localField: "owner",
        foreignField: "_id",
        as: "owner",
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
        owner: {
          $first: "$owner",
        },
      },
    },
  ];

  if (query.trim()) {
    const search = query.trim().toLowerCase().replace(/\s+/g, "");

    pipeline.push({
      $match: {
        $expr: {
          $or: [
            {
              $regexMatch: {
                input: {
                  $replaceAll: {
                    input: {
                      $toLower: "$title",
                    },
                    find: " ",
                    replacement: "",
                  },
                },
                regex: search,
              },
            },

            {
              $regexMatch: {
                input: {
                  $replaceAll: {
                    input: {
                      $toLower: "$description",
                    },
                    find: " ",
                    replacement: "",
                  },
                },
                regex: search,
              },
            },

            {
              $regexMatch: {
                input: {
                  $replaceAll: {
                    input: {
                      $toLower: "$owner.fullName",
                    },
                    find: " ",
                    replacement: "",
                  },
                },
                regex: search,
              },
            },

            {
              $regexMatch: {
                input: {
                  $replaceAll: {
                    input: {
                      $toLower: "$owner.username",
                    },
                    find: " ",
                    replacement: "",
                  },
                },
                regex: search,
              },
            },
          ],
        },
      },
    });
  }

  pipeline.push({
    $sort: {
      [sortBy]: sortType === "asc" ? 1 : -1,
    },
  });

  const aggregate = Video.aggregate(pipeline);

  const videos = await Video.aggregatePaginate(aggregate, {
    page: Number(page),
    limit: Number(limit),
  });

  return res
    .status(200)
    .json(new ApiResponse(200, videos, "Videos fetched successfully"));
});

const publishAVideo = asyncHandler(async (req, res) => {
  const { title, description, category, isPublished = "true" } = req.body;

  if ([title, description].some((field) => !field || field.trim() === "")) {
    throw new ApiError(400, "Title and Description are required");
  }

  const videoLocalPath = req.files?.videoFile?.[0]?.path;
  if (!videoLocalPath) {
    throw new ApiError(400, "Video file is required");
  }

  const thumbnailLocalPath = req.files?.thumbnail?.[0]?.path;
  if (!thumbnailLocalPath) {
    throw new ApiError(400, "Thumbnail is required");
  }

  const video = await uploadOnCloudinary(videoLocalPath);

  if (!video) {
    throw new ApiError(500, "Failed to upload video");
  }

  const thumbnail = await uploadOnCloudinary(thumbnailLocalPath);
  if (!thumbnail) {
    throw new ApiError(500, "Failed to upload thumbnail");
  }

  const createdVideo = await Video.create({
    videoFile: video.secure_url,
    thumbnail: thumbnail.secure_url,
    title,
    description,
    category,
    duration: video.duration,
    owner: req.user._id,
    isPublished: isPublished === "true",
  });
  if (!createdVideo) {
    throw new ApiError(500, "Failed to publish video");
  }

  return res
    .status(201)
    .json(new ApiResponse(201, createdVideo, "Video published successfully"));
});

const getVideoById = asyncHandler(async (req, res) => {
  const { videoId } = req.params;

  if (!isValidObjectId(videoId)) {
    throw new ApiError(400, "Invalid Video Id");
  }

  const video = await Video.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(videoId),
      },
    },

    {
      $lookup: {
        from: "users",
        localField: "owner",
        foreignField: "_id",
        as: "owner",
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
            $addFields: {
              subscribersCount: {
                $size: "$subscribers",
              },

              isSubscribed: {
                $in: [req.user?._id, "$subscribers.subscriber"],
              },
            },
          },

          {
            $project: {
              fullName: 1,
              username: 1,
              avatar: 1,
              coverImage: 1,
              subscribersCount: 1,
              isSubscribed: 1,
            },
          },
        ],
      },
    },

    {
      $lookup: {
        from: "likes",
        localField: "_id",
        foreignField: "video",
        as: "likes",
      },
    },

    {
      $addFields: {
        owner: {
          $first: "$owner",
        },

        likesCount: {
          $size: "$likes",
        },

        isLiked: {
          $in: [req.user?._id, "$likes.likedBy"],
        },
      },
    },
    {
      $project: {
        videoFile: 1,
        thumbnail: 1,
        title: 1,
        description: 1,
        duration: 1,
        views: 1,
        createdAt: 1,
        isPublished: 1,
        owner: 1,
        likesCount: 1,
        isLiked: 1,
      },
    },
  ]);

  if (!video.length) {
    throw new ApiError(404, "Video not found");
  }

  await Video.findByIdAndUpdate(
    videoId,
    {
      $inc: {
        views: 1,
      },
    },
    {
      new: false,
    }
  );

  video[0].views += 1;

  return res
    .status(200)
    .json(new ApiResponse(200, video[0], "Video fetched successfully"));
});

const updateVideo = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  const { title, description } = req.body;

  if (!isValidObjectId(videoId)) {
    throw new ApiError(400, "Invalid Video Id");
  }

  if ([title, description].some((field) => !field || field.trim() === "")) {
    throw new ApiError(400, "Title and Description are required");
  }

  const thumbnailLocalPath = req.file?.path;
  if (!thumbnailLocalPath) {
    throw new ApiError(400, "Thumbnail is required");
  }

  const thumbnail = await uploadOnCloudinary(thumbnailLocalPath);
  if (!thumbnail) {
    throw new ApiError(500, "Failed to upload thumbnail");
  }

  const updatedVideo = await Video.findByIdAndUpdate(
    videoId,
    {
      $set: {
        title,
        description,
        thumbnail: thumbnail.secure_url,
      },
    },
    {
      new: true,
    }
  );

  if (!updatedVideo) {
    throw new ApiError(404, "Video not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, updatedVideo, "Video updated successfully"));
});

const deleteVideo = asyncHandler(async (req, res) => {
  const { videoId } = req.params;

  if (!isValidObjectId(videoId)) {
    throw new ApiError(400, "Invalid Video Id");
  }

  const deletedVideo = await Video.findByIdAndDelete(videoId);

  if (!deletedVideo) {
    throw new ApiError(404, "Video not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, deletedVideo, "Video deleted successfully"));
});

const togglePublishStatus = asyncHandler(async (req, res) => {
  const { videoId } = req.params;

  if (!isValidObjectId(videoId)) {
    throw new ApiError(400, "Invalid Video Id");
  }

  const video = await Video.findById(videoId);
  if (!video) {
    throw new ApiError(404, "Video not found");
  }

  video.isPublished = !video.isPublished;

  await video.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json(new ApiResponse(200, video, "Publish status updated successfully"));
});

export {
  getAllVideos,
  publishAVideo,
  getVideoById,
  updateVideo,
  deleteVideo,
  togglePublishStatus,
};
