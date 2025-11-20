import { Request, Response } from "express";
import { asyncHandler } from "../../../../middleware/asyncHandler";
import { getUsersService } from "../../../../lib/user";

export const getUsers = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?._id;

  const users = await getUsersService(userId);

  return res.status(200).json({
    message: "Users retrieved successfully",
    users,
  });
});
