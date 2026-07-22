import { Video } from "../models/video.model.js";
import { User } from "../models/user.model.js";

const categories = [
  "Programming",
  "AI",
  "Gaming",
  "Music",
  "Education",
  "News",
  "Sports",
  "Movies",
  "Live",
];

const randomDuration = () => {
  return Math.floor(Math.random() * 1200) + 180;
};

const randomViews = () => {
  return Math.floor(Math.random() * 50000) + 500;
};

const randomDate = () => {
  const start = new Date(2024, 0, 1);
  const end = new Date();

  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
};

const videoData = [
  {
    title: "JavaScript Array Methods Explained",
    category: "Programming",
    description:
      "Learn the most useful JavaScript array methods with practical examples.",
  },

  {
    title: "Master React Hooks",
    category: "Programming",
    description:
      "Complete guide to React Hooks including useState, useEffect and more.",
  },

  {
    title: "Build REST API with Node.js",
    category: "Programming",
    description:
      "Create a production-ready REST API using Express and MongoDB.",
  },

  {
    title: "Introduction to Artificial Intelligence",
    category: "AI",
    description: "Understand the fundamentals of Artificial Intelligence.",
  },

  {
    title: "Top AI Tools Every Developer Should Know",
    category: "AI",
    description: "Explore modern AI tools for developers and creators.",
  },

  {
    title: "Machine Learning Basics",
    category: "AI",
    description: "A beginner friendly introduction to Machine Learning.",
  },

  {
    title: "Top 10 Open World Games",
    category: "Gaming",
    description: "Explore the best open world games you should play this year.",
  },

  {
    title: "Minecraft Survival Guide",
    category: "Gaming",
    description: "Essential survival tips and tricks for Minecraft beginners.",
  },

  {
    title: "Best Gaming Setup Under $1000",
    category: "Gaming",
    description: "Build a powerful gaming setup without breaking your budget.",
  },

  {
    title: "Top Relaxing Piano Music",
    category: "Music",
    description: "Enjoy peaceful piano music for studying and relaxation.",
  },

  {
    title: "Music Production for Beginners",
    category: "Music",
    description: "Learn how to create your first music track from scratch.",
  },

  {
    title: "Top 20 Trending Songs",
    category: "Music",
    description: "Listen to the latest trending songs loved by millions.",
  },

  {
    title: "Study Smarter Not Harder",
    category: "Education",
    description: "Simple techniques to improve focus and learning speed.",
  },

  {
    title: "Complete English Grammar Course",
    category: "Education",
    description: "Master English grammar with easy explanations.",
  },

  {
    title: "How to Prepare for Interviews",
    category: "Education",
    description: "Tips to crack technical and HR interviews confidently.",
  },

  {
    title: "Today's Technology Headlines",
    category: "News",
    description: "Latest technology news from around the world.",
  },

  {
    title: "Global Business Update",
    category: "News",
    description: "Daily business news and market updates.",
  },

  {
    title: "Weekly World News",
    category: "News",
    description: "Top international stories of the week.",
  },

  {
    title: "Football Match Highlights",
    category: "Sports",
    description: "Watch exciting football highlights and best goals.",
  },

  {
    title: "Cricket Training Tips",
    category: "Sports",
    description: "Improve your batting and bowling skills.",
  },

  {
    title: "Top Fitness Exercises",
    category: "Sports",
    description: "Exercises to improve stamina and athletic performance.",
  },

  {
    title: "Top 10 Action Movies",
    category: "Movies",
    description: "Best action movies every movie lover should watch.",
  },

  {
    title: "Best Sci-Fi Movies",
    category: "Movies",
    description: "Explore mind-blowing science fiction films.",
  },

  {
    title: "Upcoming Movie Trailers",
    category: "Movies",
    description: "Latest movie trailers and upcoming releases.",
  },

  {
    title: "Live Coding Session",
    category: "Live",
    description: "Join a live coding session building a MERN project.",
  },

  {
    title: "Live Gaming Tournament",
    category: "Live",
    description: "Watch professional gamers compete live.",
  },

  {
    title: "Live Tech Conference",
    category: "Live",
    description: "Streaming the latest technology conference live.",
  },
];

export const seedVideos = async () => {
  try {
    console.log("🎥 Seeding Videos...");

    await Video.deleteMany();

    const users = await User.find();

    if (!users.length) {
      throw new Error("No users found. Please seed users first.");
    }

    const videos = videoData.map((video, index) => ({
      title: video.title,
      description: video.description,
      category: video.category,

      owner: users[Math.floor(Math.random() * users.length)]._id,

      videoFile: "https://res.cloudinary.com/demo/video/upload/dog.mp4",

      thumbnail: `https://picsum.photos/640/360?random=${index + 1}`,

      duration: randomDuration(),

      views: randomViews(),

      isPublished: true,

      createdAt: randomDate(),

      updatedAt: new Date(),
    }));

    const createdVideos = await Video.insertMany(videos);

    console.log(`✅ ${createdVideos.length} videos seeded successfully.`);

    return createdVideos;
  } catch (error) {
    console.error("❌ Error seeding videos:", error);
    process.exit(1);
  }
};

export default seedVideos;
