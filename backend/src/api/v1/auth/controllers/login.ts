import { Request, Response } from "express";
import { asyncHandler } from "../../../../middleware/asyncHandler";
import { loginSchema } from "../../../../validator/auth";
import { setJwtAuthCookie } from "../../../../lib/token";
import { loginService } from "../../../../lib/auth";

export const login = asyncHandler(async (req: Request, res: Response) => {
  const body = loginSchema.parse(req.body);

  const user = await loginService(body);
  const userId = user._id as string;

  return setJwtAuthCookie({
    res,
    userId,
  })
    .status(201)
    .json({
      message: "User login successfully",
      user,
    });
});
