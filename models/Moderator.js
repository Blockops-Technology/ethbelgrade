import mongoose from "mongoose";

const moderatorSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
);

const Moderator =
  mongoose.models.Moderator || mongoose.model("Moderator", moderatorSchema);

export default Moderator;
