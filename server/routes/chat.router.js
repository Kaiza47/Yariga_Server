import express  from "express";

import { createChatUser, getAllChatUser, getOrCreateUser } from "../controllers/chat.controller.js";

const router = express.Router();

router.route("/").post(createChatUser);
router.route("/").put(getOrCreateUser);
router.route("/").get(getAllChatUser);

export default router;