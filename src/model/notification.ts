import mongoose, { Document, ObjectId } from "mongoose";

interface INotification extends Document {
  notification: string;
  agencyId: ObjectId;
  subAccountId?: string;
  userId: ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const notificationSchema = new mongoose.Schema<INotification>({
  notification: { type: String, required: true },
  agencyId: { type: mongoose.Schema.Types.ObjectId, ref: "Agency" },
  subAccountId: { type: mongoose.Schema.Types.ObjectId, ref: "SubAccount" },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Notification = mongoose.model<INotification>(
  "Notification",
  notificationSchema
);

export default Notification;
