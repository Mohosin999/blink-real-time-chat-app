// import "dotenv/config";
// import express, { Application } from "express";
// import passport from "passport";
// import cookieParser from "cookie-parser";
// import cors from "cors";

// import "../config/passport";

// export const applyMiddleware = (app: Application): void => {
//   app.use(express.json({ limit: "10mb" }));
//   app.use(cookieParser());
//   app.use(express.urlencoded({ extended: true }));
//   app.use(
//     cors({
//       origin: process.env.FRONTEND_ORIGIN,
//       credentials: true,
//     })
//   );

//   app.use(passport.initialize());
// };

import "dotenv/config";
import express, { Application } from "express";
import passport from "passport";
import cookieParser from "cookie-parser";
import cors from "cors";

import "../config/passport";

export const applyMiddleware = (app: Application): void => {
  app.use(express.json({ limit: "10mb" }));
  app.use(cookieParser());
  app.use(express.urlencoded({ extended: true }));
  app.use(
    cors({
      origin: [
        process.env.FRONTEND_ORIGIN,
        "http://localhost:5173",
        "http://localhost:4173",
      ],
      credentials: true,
    }),
  );

  app.use(passport.initialize());
};
