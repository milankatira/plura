import mongoose, { Document } from "mongoose";

enum Plan {}
// Define your plan enum values here

interface ISubscription extends Document {
  plan?: Plan;
  price?: string;
  active: boolean;
  priceId: string;
  customerId: string;
  currentPeriodEndDate: Date;
  subscritiptionId: string;
  agencyId?: string;
}

const subscriptionSchema = new mongoose.Schema<ISubscription>({
  plan: { type: String, enum: Object.values(Plan) },
  price: { type: String },
  active: { type: Boolean, default: false },
  priceId: { type: String, unique: true },
  customerId: { type: String },
  currentPeriodEndDate: { type: Date },
  subscritiptionId: { type: String, unique: true },
  agencyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Agency",
    unique: true,
  },
});

const Subscription = mongoose.model<ISubscription>(
  "Subscription",
  subscriptionSchema
);

export default Subscription;
