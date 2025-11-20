import { Request, Response } from "express";
import { asyncHandler } from "../../../../middleware/asyncHandler";
import { clearJwtAuthCookie } from "../../../../lib/token";

export const logout = asyncHandler(async (req: Request, res: Response) => {
  return clearJwtAuthCookie(res).status(200).json({
    message: "User logout successfully",
  });
});
