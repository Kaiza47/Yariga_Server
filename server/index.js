import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";

import connectDB from "./mongodb/connect.js";
import userRouter from "./routes/user.routes.js";
import propertyRouter from "./routes/property.routes.js";
import chatRouter from "./routes/chat.router.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));

app.get("/", (req, res) => {
  res.send({ message: "hello world" });
});

// app.post("/authenticate", async (req, res) => {
//   const { username, email } = req.body;
//   // Get or create user on Chat Engine!
//   try {
//     const r = await axios.put(
//       "https://api.chatengine.io/users/",
//       { username: username, secret: email, first_name: username },
//       { headers: { "Private-Key": "f2c4df3b-ad80-40a3-b2f6-fe05708c1eb1" } }
//     );
//     return res.status(r.status).json(r.data);
//   } catch (e) {
//     return res.status(e.response.status).json(e.response.data);
//   }
// });


app.use("/api/v1/users", userRouter);
app.use("/api/v1/properties", propertyRouter);
app.use("/api/v1/chat", chatRouter);


const startServer = async () => {
  try {
    //connect to the database
    connectDB(process.env.MONGODB_URL);

    app.listen(8080, () =>
      console.log("server started on port http://localhost:8080")
    );
  } catch (error) {
    console.log(error);
  }
};

startServer();