import { Request, Response } from "express";
import { asyncHandler } from "../../../../middleware/asyncHandler";
import { sendMessageSchema } from "../../../../validator/message";
import { sendMessageService } from "../../../../lib/message";

export const sendMessage = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?._id;
  const body = sendMessageSchema.parse(req.body);

  const result = await sendMessageService(userId, body);

  return res.status(200).json({
    message: "Message sent successfully",
    ...result,
  });
});
