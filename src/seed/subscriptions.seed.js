import { Subscription } from "../models/subscription.model.js";
import { User } from "../models/user.model.js";

export const seedSubscriptions = async () => {
  try {
    console.log("🔔 Seeding Subscriptions...");

    await Subscription.deleteMany();

    const users = await User.find();

    if (users.length < 2) {
      throw new Error("Not enough users.");
    }

    const subscriptions = [];
    const uniqueSubs = new Set();

        while (subscriptions.length < 30) {
      const subscriber =
        users[Math.floor(Math.random() * users.length)];

      const channel =
        users[Math.floor(Math.random() * users.length)];

      if (subscriber._id.equals(channel._id)) continue;

      const key = `${subscriber._id}-${channel._id}`;

      if (uniqueSubs.has(key)) continue;

      uniqueSubs.add(key);

      subscriptions.push({
        subscriber: subscriber._id,
        channel: channel._id,
      });
    }

        await Subscription.insertMany(subscriptions);

    console.log(
      `✅ ${subscriptions.length} subscriptions seeded successfully.`
    );
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

export default seedSubscriptions;