import { User } from "../models/user.model.js";
import { Video } from "../models/video.model.js";

export const seedWatchHistory = async () => {
  try {
    console.log("📺 Seeding Watch History...");

    const users = await User.find();
    const videos = await Video.find();

    if (!users.length || !videos.length) {
      throw new Error("Users or Videos not found.");
    }

    for (const user of users) {
      const shuffledVideos = [...videos].sort(
        () => Math.random() - 0.5
      );

      const watchHistory = shuffledVideos
        .slice(0, Math.floor(Math.random() * 3) + 8) // 8–10 videos
        .map((video) => video._id);

      user.watchHistory = watchHistory;

      await user.save();
    }

    console.log(
      `✅ Watch history seeded for ${users.length} users.`
    );
  } catch (error) {
    console.error("❌ Error seeding watch history:", error);
    process.exit(1);
  }
};

export default seedWatchHistory;