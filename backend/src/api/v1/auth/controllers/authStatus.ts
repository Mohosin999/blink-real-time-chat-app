import { Request, Response } from "express";
import { asyncHandler } from "../../../../middleware/asyncHandler";

export const authStatus = asyncHandler(async (req: Request, res: Response) => {
  const user = req.user?._id;
  return res.status(200).json({
    message: "Authenticated User",
    user,
  });
});
