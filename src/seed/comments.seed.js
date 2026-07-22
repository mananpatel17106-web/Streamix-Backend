import { Comment } from "../models/comment.model.js";
import { User } from "../models/user.model.js";
import { Video } from "../models/video.model.js";

const commentsData = [
  "Amazing video!",
  "Very helpful, thanks.",
  "Keep uploading more content.",
  "Excellent explanation.",
  "Loved this tutorial.",
  "One of the best videos.",
  "Easy to understand.",
  "This solved my problem.",
  "Waiting for the next part.",
  "Great work!",
  "Nice editing.",
  "Awesome content.",
  "Thanks for sharing.",
  "Very informative.",
  "Highly recommended.",
  "Perfect explanation.",
  "Really enjoyed this.",
  "Fantastic tutorial.",
  "Learned something new today.",
  "Keep it up!",
];

export const seedComments = async () => {
  try {
    console.log("💬 Seeding Comments...");

    await Comment.deleteMany();

    const users = await User.find();
    const videos = await Video.find();

    if (!users.length || !videos.length) {
      throw new Error("Users or Videos not found.");
    }

    const comments = [];

        for (let i = 0; i < 60; i++) {
      const user =
        users[Math.floor(Math.random() * users.length)];

      const video =
        videos[Math.floor(Math.random() * videos.length)];

      const content =
        commentsData[
          Math.floor(Math.random() * commentsData.length)
        ];

      comments.push({
        content,
        owner: user._id,
        video: video._id,
      });
    }

        await Comment.insertMany(comments);

    console.log(
      `✅ ${comments.length} comments seeded successfully.`
    );
  } catch (error) {
    console.error("❌ Error seeding comments:", error);
    process.exit(1);
  }
};

export default seedComments;