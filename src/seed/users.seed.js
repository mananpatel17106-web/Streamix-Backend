import { User } from "../models/user.model.js";

const users = [
  {
    fullName: "John Smith",
    username: "johnsmith",
    email: "john@example.com",
    password: "12345678",
    avatar: "https://i.pravatar.cc/300?img=1",
    coverImage: "https://picsum.photos/1200/300?random=1",
  },
  {
    fullName: "Emily Johnson",
    username: "emilyjohnson",
    email: "emily@example.com",
    password: "12345678",
    avatar: "https://i.pravatar.cc/300?img=2",
    coverImage: "https://picsum.photos/1200/300?random=2",
  },
  {
    fullName: "Michael Brown",
    username: "michaelbrown",
    email: "michael@example.com",
    password: "12345678",
    avatar: "https://i.pravatar.cc/300?img=3",
    coverImage: "https://picsum.photos/1200/300?random=3",
  },
  {
    fullName: "Sophia Wilson",
    username: "sophiawilson",
    email: "sophia@example.com",
    password: "12345678",
    avatar: "https://i.pravatar.cc/300?img=4",
    coverImage: "https://picsum.photos/1200/300?random=4",
  },
  {
    fullName: "Daniel Miller",
    username: "danielmiller",
    email: "daniel@example.com",
    password: "12345678",
    avatar: "https://i.pravatar.cc/300?img=5",
    coverImage: "https://picsum.photos/1200/300?random=5",
  },
  {
    fullName: "Olivia Davis",
    username: "oliviadavis",
    email: "olivia@example.com",
    password: "12345678",
    avatar: "https://i.pravatar.cc/300?img=6",
    coverImage: "https://picsum.photos/1200/300?random=6",
  },
  {
    fullName: "James Anderson",
    username: "jamesanderson",
    email: "james@example.com",
    password: "12345678",
    avatar: "https://i.pravatar.cc/300?img=7",
    coverImage: "https://picsum.photos/1200/300?random=7",
  },
  {
    fullName: "Ava Thomas",
    username: "avathomas",
    email: "ava@example.com",
    password: "12345678",
    avatar: "https://i.pravatar.cc/300?img=8",
    coverImage: "https://picsum.photos/1200/300?random=8",
  },
  {
    fullName: "William Moore",
    username: "williammoore",
    email: "william@example.com",
    password: "12345678",
    avatar: "https://i.pravatar.cc/300?img=9",
    coverImage: "https://picsum.photos/1200/300?random=9",
  },
  {
    fullName: "Isabella Taylor",
    username: "isabellataylor",
    email: "isabella@example.com",
    password: "12345678",
    avatar: "https://i.pravatar.cc/300?img=10",
    coverImage: "https://picsum.photos/1200/300?random=10",
  },
];

export const seedUsers = async () => {
  try {
    console.log("🌱 Seeding Users...");

    const count = await User.countDocuments();

    if (count > 0) {
      console.log("✅ Users already exist. Skipping...");
      return await User.find();
    }

    const createdUsers = [];

    for (const user of users) {
      // User.create() triggers pre("save") hook,
      // so password gets hashed automatically.
      const createdUser = await User.create(user);
      createdUsers.push(createdUser);
    }

    console.log(`✅ ${createdUsers.length} users seeded successfully.`);

    return createdUsers;
  } catch (error) {
    console.error("❌ Error seeding users:", error);
    process.exit(1);
  }
};

export default seedUsers;