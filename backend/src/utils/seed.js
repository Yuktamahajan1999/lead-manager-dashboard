import mongoose from "mongoose";
import dotenv from "dotenv";
import { faker } from "@faker-js/faker";
import Lead from "../models/Lead.js"; 

dotenv.config();

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.ATLAS_KEY);
    console.log("Connected to MongoDB for seeding...");
    console.log("MONGO_URI =", process.env.ATLAS_KEY); 

    // Delete old leads
    await Lead.deleteMany({});
    console.log("Old leads cleared.");

    // Generate fake leads
    const leads = [];
    for (let i = 0; i < 1000; i++) {
      leads.push({
        name: faker.person.fullName(),
        email: faker.internet.email(),
        phone: faker.phone.number(),
        status: faker.helpers.arrayElement(["New", "Contacted", "Qualified", "Converted", "Lost"]),
        source: faker.helpers.arrayElement(["Website", "LinkedIn", "Referral", "Google Ads"]),
        assignedTo: faker.person.firstName(),
      });
    }

    // Insert into DB
    await Lead.insertMany(leads);
    console.log("✅ Successfully seeded 1,000 leads!");

    // Close connection
    mongoose.connection.close();
  } catch (error) {
    console.error("❌ Seeding Error:", error.message);
    process.exit(1);
  }
};

seedDB();
