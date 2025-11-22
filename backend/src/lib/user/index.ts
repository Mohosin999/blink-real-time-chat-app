import User from "../../model/User";

export const findByUserService = async (userId: string) => {
  return await User.findById(userId);
};

// Get all users except current user
export const getUsersService = async (userId: string) => {
  const users = await User.find({ _id: { $ne: userId } }).select("-password");

  return users;
};

export async function findOrCreateGoogleUserService(profile: any) {
  const googleId = profile.id;

  let user = await User.findOne({ googleId });

  if (!user) {
    user = await User.create({
      googleId,
      name: profile.displayName,
      email: profile.emails?.[0]?.value,
      avatar: profile.photos?.[0]?.value,
    });
  }

  return user;
}
