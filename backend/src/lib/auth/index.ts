import User from "../../model/User";
import { authenticationError, notFound } from "../../utils/error";
import { LoginSchemaType, RegisterSchemaType } from "../../validator/auth";

export const registerService = async (body: RegisterSchemaType) => {
  const { email } = body;

  const existingUser = await User.findOne({ email });
  if (existingUser) throw authenticationError("User already exist");

  const newUser = new User({ ...body });
  await newUser.save();
  return newUser;
};

export const loginService = async (body: LoginSchemaType) => {
  const { email, password } = body;

  const user = await User.findOne({ email });
  if (!user) throw notFound("Email or password not found");

  const isPasswordValid = await user.comparePassword(password);
  if (!isPasswordValid) throw authenticationError("Invalid email or password");

  return user;
};
