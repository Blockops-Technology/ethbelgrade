import mongoose from "mongoose";

const speakerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    link: {
      type: String,
    },
    image: {
      type: String,
      required: true,
    },
    order: {
      type: Number,
      required: true,
      default: 0,
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
);

const Speaker = mongoose.models.Speaker || mongoose.model("Speaker", speakerSchema);

export default Speaker;
