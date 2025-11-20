import { Router } from "express";
import { passportAuthenticateJwt } from "../config/passport";
import { controllers as authControllers } from "../api/v1/auth";
import { controllers as chatControllers } from "../api/v1/chat";
import { controllers as userControllers } from "../api/v1/user";
import { controllers as messageControllers } from "../api/v1/message";

const router = Router();

// Auth routes
router
  .post("/api/v1/auth/register", authControllers.register)
  .post("/api/v1/auth/login", authControllers.login)
  .post("/api/v1/auth/logout", authControllers.logout)
  .post("/api/v1/auth/status", authControllers.authStatus);

// Chat routes
router
  .use(passportAuthenticateJwt)
  .post("/api/v1/chats", chatControllers.createChat)
  .get("/api/v1/chats", chatControllers.getUserChats)
  .get("/api/v1/chats/:id", chatControllers.getSingleChat);

// Message routes
router.post("/api/v1/messages", messageControllers.sendMessage);

// User routes
router.get("/api/v1/users", passportAuthenticateJwt, userControllers.getUsers);

export default router;
