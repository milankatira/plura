import mongoose, { Document, ObjectId } from "mongoose";

enum InvitationStatus {
  ACCEPTED,
  REVOKED,
  PENDING,
}


enum Role {
  AGENCY_OWNER,
  AGENCY_ADMIN,
  SUBACCOUNT_USER,
  SUBACCOUNT_GUEST
}

interface IInvitation extends Document {
  email: string;
  agencyId: ObjectId;
  status: InvitationStatus;
  role: Role;
}

const invitationSchema = new mongoose.Schema<IInvitation>({
  email: { type: String, unique: true },
  agencyId: { type: mongoose.Schema.Types.ObjectId, ref: "Agency" },
  status: {
    type: String,
    enum: Object.values(InvitationStatus),
    default: InvitationStatus.PENDING,
  },
  role: {
    type: String,
    enum: Object.values(Role),
    default: Role.SUBACCOUNT_USER,
  },
});

const Invitation = mongoose.model<IInvitation>("Invitation", invitationSchema);

export default Invitation;
