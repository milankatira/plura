import { clerkClient } from "@clerk/nextjs";
import Agency, { IAgency } from "../model/agency";
import User, { IUser } from "../model/user";
import dbConnect from "../utils/db";
enum Plan {
  price_1OYxkqFj9oKEERu1NbKUxXxN,
  price_1OYxkqFj9oKEERu1KfJGWxgN,
}
export const updateUser = async (newUser: Partial<IUser>) => {
  await dbConnect();
  try {
    const user: IUser | null = await User.findOne({ email: newUser.email });
    if (!user) {
      throw new Error("User not found");
    }
    const userData: IUser = await User.findOneAndUpdate(
      { email: user.email },
      newUser,
      { new: true, upsert: true }
    );
    await clerkClient.users.updateUserMetadata(user.id, {
      privateMetadata: {
        role: newUser.role ?? "SUBACCOUNT_USER",
      },
    });

    return { success: true, data: userData };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

export const upsertAgency = async (agency: IAgency, price?: Plan) => {
  if (!agency.companyEmail) return null;
  try {
    const agencyData: IAgency | null = await Agency.findOne({
      companyEmail: agency.companyEmail,
    });
    if (!agencyData) {
      throw new Error("agency not found");
    }
    const agencyDetails = async (agency: IAgency, price?: Plan) => {
      if (!agency.companyEmail) return null;
      try {
        const agencyDetails = await Agency.findOneAndUpdate(
          { id: agency.id }, // Assuming id is the unique identifier for your agency
          agency,
          { upsert: true, new: true }
        );

        // Create sidebar options
        const sidebarOptions = [
          {
            name: "Dashboard",
            icon: "category",
            link: `/agency/${agency.id}`,
          },
          {
            name: "Launchpad",
            icon: "clipboardIcon",
            link: `/agency/${agency.id}/launchpad`,
          },
          {
            name: "Billing",
            icon: "payment",
            link: `/agency/${agency.id}/billing`,
          },
          {
            name: "Settings",
            icon: "settings",
            link: `/agency/${agency.id}/settings`,
          },
          {
            name: "Sub Accounts",
            icon: "person",
            link: `/agency/${agency.id}/all-subaccounts`,
          },
          {
            name: "Team",
            icon: "shield",
            link: `/agency/${agency.id}/team`,
          },
        ];

        // Update or create sidebar options
        agencyDetails.SidebarOption = sidebarOptions;
        await agencyDetails.save();

        return agencyDetails;
      } catch (error) {
        console.log(error);
        throw new Error("Failed to upsert agency details");
      }
    };
    return agencyDetails;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to upsert agency details");
  }
};
