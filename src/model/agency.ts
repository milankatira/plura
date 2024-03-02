import mongoose, { Document } from "mongoose";

// Define the interface representing the Agency model
export interface IAgency extends Document {
  connectAccountId: string;
  customerId: string;
  name: string;
  agencyLogo: string;
  companyEmail: string;
  companyPhone: string;
  whiteLabel: boolean;
  address: string;
  city: string;
  zipCode: string;
  state: string;
  country: string;
  goal: number;
  users: string[]; // Assuming this is an array of user IDs
  createdAt: Date;
  updatedAt: Date;
  SubAccount: string[]; // Assuming this is an array of SubAccount IDs
  SidebarOption: string[]; // Assuming this is an array of SidebarOption IDs
  Invitation: string[]; // Assuming this is an array of Invitation IDs
  Notification: string[]; // Assuming this is an array of Notification IDs
  Subscription?: string; // Assuming this is the ID of the Subscription
  AddOns: string[]; // Assuming this is an array of AddOns IDs
}

// Define the Mongoose schema
const agencySchema = new mongoose.Schema<IAgency>({
  connectAccountId: { type: String, default: "" },
  customerId: { type: String, default: "" },
  name: { type: String, required: true },
  agencyLogo: { type: String, required: true },
  companyEmail: { type: String, required: true },
  companyPhone: { type: String, required: true },
  whiteLabel: { type: Boolean, default: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  zipCode: { type: String, required: true },
  state: { type: String, required: true },
  country: { type: String, required: true },
  goal: { type: Number, default: 5 },
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  SubAccount: [{ type: mongoose.Schema.Types.ObjectId, ref: "SubAccount" }],
  SidebarOption: [
    { type: mongoose.Schema.Types.ObjectId, ref: "AgencySidebarOption" },
  ],
  Invitation: [{ type: mongoose.Schema.Types.ObjectId, ref: "Invitation" }],
  Notification: [{ type: mongoose.Schema.Types.ObjectId, ref: "Notification" }],
  Subscription: { type: mongoose.Schema.Types.ObjectId, ref: "Subscription" },
  AddOns: [{ type: mongoose.Schema.Types.ObjectId, ref: "AddOns" }],
});


const Agency = mongoose.model<IAgency>("Agency", agencySchema);

export default Agency;
