import dotenv from "dotenv";
import connectDB from "../db/index.js";
import seedUsers from "./users.seed.js";
import seedVideos from "./videos.seed.js";
import dns from "dns";

dns.setServers(["1.1.1.1", "8.8.8.8"]);

dotenv.config({
  path: "./.env",
});

const startSeeding = async () => {
  try {
    await connectDB();

    await seedUsers();
    await seedVideos();

    console.log("🎉 Database seeding completed.");

    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

startSeeding();
