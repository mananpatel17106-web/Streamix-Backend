import { Like } from "../models/like.model.js";
import { User } from "../models/user.model.js";
import { Video } from "../models/video.model.js";

export const seedLikes = async () => {
  try {
    console.log("👍 Seeding Likes...");

    await Like.deleteMany();

    const users = await User.find();
    const videos = await Video.find();

    if (!users.length || !videos.length) {
      throw new Error("Users or Videos not found.");
    }

    const likes = [];
    const uniqueLikes = new Set();

        while (likes.length < 100) {
      const user =
        users[Math.floor(Math.random() * users.length)];

      const video =
        videos[Math.floor(Math.random() * videos.length)];

      const key = `${user._id}-${video._id}`;

      if (uniqueLikes.has(key)) continue;

      uniqueLikes.add(key);

      likes.push({
        likedBy: user._id,
        video: video._id,
      });
    }

        await Like.insertMany(likes);

    console.log(`✅ ${likes.length} likes seeded successfully.`);
  } catch (error) {
    console.error("❌ Error seeding likes:", error);
    process.exit(1);
  }
};

export default seedLikes;