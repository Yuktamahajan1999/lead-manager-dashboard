import mongoose from "mongoose";

const leadSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ["New", "Contacted", "Qualified", "Lost", "Converted"],
      default: "New",
    },
    value: {
      type: Number,
      required: true,
      default: 0,
    },
    source: {
      type: String,
      default: "Website",
    },
  },
  { 
    timestamps: true 
  }
);

leadSchema.index({ name: 'text', email: 'text' });

const Lead = mongoose.model("Lead", leadSchema);

export default Lead;