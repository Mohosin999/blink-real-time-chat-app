import { Request, Response } from "express";
import { asyncHandler } from "../../../../middleware/asyncHandler";
import { chatIdSchema } from "../../../../validator/chat";
import { getSingleChatService } from "../../../../lib/chat";

export const getSingleChat = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user?._id;
    const { id } = chatIdSchema.parse(req.params);

    const { chat, messages } = await getSingleChatService(id, userId);

    return res.status(200).json({
      message: "User chats retrieved successfully",
      chat,
      messages,
    });
  }
);
