import mongoose from "mongoose";

const sponsorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    link: { type: String, required: true },
    image: { type: String, required: true },
    alt: { type: String, required: true },
    tier: { type: String },
    module: { type: String },
    order: { type: Number, required: true, default: 0 },
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

const Sponsor = mongoose.models.Sponsor || mongoose.model("Sponsor", sponsorSchema);

export default Sponsor;
