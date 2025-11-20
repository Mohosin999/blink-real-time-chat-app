import { ErrorRequestHandler } from "express";
import { CustomError } from "./../utils/error";

export const errorHandler: ErrorRequestHandler = (
  error,
  req,
  res,
  _next
): any => {
  console.log(`Error occurred: ${req.path}`, error);

  if (error instanceof CustomError) {
    return res.status(error.status).json({
      message: error.message,
      statusCode: error.status,
    });
  }

  return res.status(500).json({
    message: "Internal Server Error",
    error: error?.message || "Something went wrong",
    errorCode: 500,
  });
};
