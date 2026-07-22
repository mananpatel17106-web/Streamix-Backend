import { Playlist } from "../models/playlist.model.js";
import { User } from "../models/user.model.js";
import { Video } from "../models/video.model.js";

const playlistData = [
  {
    name: "JavaScript Mastery",
    description: "Best JavaScript tutorials and tips.",
  },
  {
    name: "React Complete Course",
    description: "Everything about React from beginner to advanced.",
  },
  {
    name: "AI Learning",
    description: "Artificial Intelligence and Machine Learning videos.",
  },
  {
    name: "Gaming Collection",
    description: "Top gaming videos and walkthroughs.",
  },
  {
    name: "Study Playlist",
    description: "Educational videos for students.",
  },
  {
    name: "Watch Later",
    description: "Videos saved to watch later.",
  },
];

export const seedPlaylists = async () => {
  try {
    console.log("📂 Seeding Playlists...");

    await Playlist.deleteMany();

    const users = await User.find();
    const videos = await Video.find();

    if (!users.length || !videos.length) {
      throw new Error("Users or Videos not found.");
    }

    const playlists = playlistData.map((playlist) => {
      const owner =
        users[Math.floor(Math.random() * users.length)];

      const shuffled = [...videos].sort(() => 0.5 - Math.random());

      return {
        name: playlist.name,
        description: playlist.description,
        owner: owner._id,
        videos: shuffled
          .slice(0, Math.floor(Math.random() * 6) + 3)
          .map((video) => video._id),
      };
    });

    await Playlist.insertMany(playlists);

    console.log(
      `✅ ${playlists.length} playlists seeded successfully.`
    );
  } catch (error) {
    console.error("❌ Error seeding playlists:", error);
    process.exit(1);
  }
};

export default seedPlaylists;