import mongoose, { Document, ObjectId } from "mongoose";


enum Icon {
  settings,
  chart,
  calendar,
  check,
  chip,
  compass,
  database,
  flag,
  home,
  info,
  link,
  lock,
  messages,
  notification,
  payment,
  power,
  receipt,
  shield,
  star,
  tune,
  videorecorder,
  wallet,
  warning,
  headphone,
  send,
  pipelines,
  person,
  category,
  contact,
  clipboardIcon,
}
interface IAgencySidebarOption extends Document {
  name: string;
  link: string;
  icon: Icon;
  agencyId: ObjectId;
  createdAt: Date;
  updatedAt: Date;
}


const agencySidebarOptionSchema = new mongoose.Schema<IAgencySidebarOption>({
  name: { type: String, default: "Menu" },
  link: { type: String, default: "#" },
  icon: { type: String, enum: Object.values(Icon), default: Icon.info },
  agencyId: { type: mongoose.Schema.Types.ObjectId, ref: "Agency" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const AgencySidebarOption = mongoose.model<IAgencySidebarOption>(
  "AgencySidebarOption",
  agencySidebarOptionSchema
);

export default AgencySidebarOption;
