import mongoose, { Document } from "mongoose";

interface IAddOns extends Document {
  name: string;
  active: boolean;
  priceId: string;
  agencyId?: string;
}

const addOnsSchema = new mongoose.Schema<IAddOns>({
  name: { type: String, required: true },
  active: { type: Boolean, default: false },
  priceId: { type: String, unique: true },
  agencyId: { type: mongoose.Schema.Types.ObjectId, ref: "Agency" },
});

const AddOns = mongoose.model<IAddOns>("AddOns", addOnsSchema);

export default AddOns;
