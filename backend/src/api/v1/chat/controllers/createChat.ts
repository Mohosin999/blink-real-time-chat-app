import { Request, Response } from "express";
import { asyncHandler } from "../../../../middleware/asyncHandler";
import { createChatSchema } from "../../../../validator/chat";
import { createChatService } from "../../../../lib/chat";

export const createChat = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?._id;

  const body = createChatSchema.parse(req.body);

  const chat = await createChatService(userId, body);

  return res.status(200).json({
    message: "Chat created successfully",
    chat,
  });
});
