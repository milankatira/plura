import mongoose, { Document, Model } from "mongoose";

export interface IUser extends Document {
  name: string;
  avatarUrl?: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  role:
    | "AGENCY_OWNER"
    | "AGENCY_ADMIN"
    | "SUBACCOUNT_USER"
    | "SUBACCOUNT_GUEST";
  agencyId?: string;
  permissions: {
    email: string;
    subAccountId: string;
    access: boolean;
  }[];
  tickets: {
    name: string;
    createdAt: Date;
    updatedAt: Date;
    laneId: string;
    order: number;
    value?: number;
    description?: string;
    customerId?: string;
    assignedUserId?: string;
  }[];
  notifications: {
    notification: string;
    agencyId: string;
    subAccountId?: string;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
  }[];
}

const userSchema = new mongoose.Schema<IUser>({
  name: {
    type: String,
    required: true,
  },
  avatarUrl: String,
  email: {
    type: String,
    unique: true,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  role: {
    type: String,
    enum: [
      "AGENCY_OWNER",
      "AGENCY_ADMIN",
      "SUBACCOUNT_USER",
      "SUBACCOUNT_GUEST",
    ],
    default: "SUBACCOUNT_USER",
  },
  agencyId: String,
  permissions: [
    {
      email: String,
      subAccountId: String,
      access: Boolean,
    },
  ],
  tickets: [
    {
      name: String,
      createdAt: {
        type: Date,
        default: Date.now,
      },
      updatedAt: {
        type: Date,
        default: Date.now,
      },
      laneId: String,
      order: {
        type: Number,
        default: 0,
      },
      value: Number,
      description: String,
      customerId: String,
      assignedUserId: String,
    },
  ],
  notifications: [
    {
      notification: String,
      agencyId: String,
      subAccountId: String,
      userId: String,
      createdAt: {
        type: Date,
        default: Date.now,
      },
      updatedAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

const User: Model<IUser> = mongoose.model("User", userSchema);

export default mongoose.models.User || User;
