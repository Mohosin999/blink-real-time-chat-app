import { Request, Response } from "express";
import { asyncHandler } from "../../../../middleware/asyncHandler";
import { registerSchema } from "../../../../validator/auth";
import { registerService } from "../../../../lib/auth";
import { setJwtAuthCookie } from "../../../../lib/token";

export const register = asyncHandler(async (req: Request, res: Response) => {
  const body = registerSchema.parse(req.body);

  const user = await registerService(body);
  const userId = user._id as string;

  return setJwtAuthCookie({
    res,
    userId,
  })
    .status(201)
    .json({
      message: "User created & login successfully",
      user,
    });
});
