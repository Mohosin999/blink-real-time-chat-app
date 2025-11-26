import { Request, Response } from "express";
import { generateAccessToken } from "../../../../lib/token";

export const googleLoginCallback = async (req: Request, res: Response) => {
  try {
    const user = req.user as any;

    const payload = {
      id: user._id,
      name: user.name,
      email: user.email,
    };

    const token = generateAccessToken({ payload });

    res.cookie("accessToken", token, {
      maxAge: 30 * 60 * 1000,
      httpOnly: true,
      secure: false, // use true in production (https)
      sameSite: "lax",
    });

    return res.redirect(process.env.FRONTEND_ORIGIN!);
    // return res.redirect(
    //   `${process.env.FRONTEND_ORIGIN}/auth-success?token=${token}`
    // );
  } catch (error) {
    console.log(error);
    return res.redirect(
      `${process.env.FRONTEND_ORIGIN}/login?error=google_failed`
    );
  }
};
