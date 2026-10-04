import mongoose from "mongoose";

const homepageSchema = new mongoose.Schema(
  {
    hero: {
      title: {
        type: String,
        required: true,
      },

      description: {
        type: String,
        required: true,
      },

      buttonText: {
        type: String,
        required: true,
      },

      buttonUrl: {
        type: String,
        required: true,
      },
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Homepage", homepageSchema);