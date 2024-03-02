import mongoose, { Document, ObjectId } from "mongoose";

interface ISubAccount extends Document {
  connectAccountId: string;
  name: string;
  subAccountLogo: string;
  companyEmail: string;
  companyPhone: string;
  goal: number;
  address: string;
  city: string;
  zipCode: string;
  state: string;
  country: string;
  createdAt: Date;
  updatedAt: Date;
  agencyId: ObjectId;
}

const subAccountSchema = new mongoose.Schema<ISubAccount>({
  connectAccountId: { type: String, default: "" },
  name: { type: String, required: true },
  subAccountLogo: { type: String, required: true },
  companyEmail: { type: String, required: true },
  companyPhone: { type: String, required: true },
  goal: { type: Number, default: 5 },
  address: { type: String, required: true },
  city: { type: String, required: true },
  zipCode: { type: String, required: true },
  state: { type: String, required: true },
  country: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  agencyId: { type: mongoose.Schema.Types.ObjectId, ref: "Agency" },
});

const SubAccount = mongoose.model<ISubAccount>("SubAccount", subAccountSchema);

export default SubAccount;
