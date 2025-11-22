// import "dotenv/config";
// import { createServer } from "http";
// import app from "./app";
// import { connectDB } from "./db/connectDB";

// const server = createServer(app);

// const port = process.env.PORT || 8000;

// const main = async () => {
//   try {
//     connectDB();

//     server.listen(port, () => {
//       console.log(`✅ Server is running on port ${port}`);
//     });
//   } catch (error) {
//     console.log("🚫 Database Error");
//     console.log(error);
//   }
// };

// main();

import "dotenv/config";
import { createServer } from "http";
import app from "./app";
import { connectDB } from "./db/connectDB";
import { initializeSocket } from "./lib/socket";

const server = createServer(app);
const port = process.env.PORT || 8000;

// Initialize Socket
initializeSocket(server);

const main = async () => {
  try {
    await connectDB();

    server.listen(port, () => {
      console.log(`✅ Server is running on port ${port}`);
    });
  } catch (error) {
    console.log("🚫 Database Error");
    console.log(error);
  }
};

main();
