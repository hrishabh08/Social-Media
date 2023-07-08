import express from "express";
import {
    getUser,
    getUserFriends,
    addRemoveFriend,
    getNOTUserFriends
} from "../controllers/user.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/:id", verifyToken, getUser); //get user profile
router.get("/:id/friends", verifyToken, getUserFriends); //get friends prfile
router.get("/:id/NOTfriends", verifyToken, getNOTUserFriends);

//UPDATES
router.patch("/:id/:friendID", addRemoveFriend); //add or remove friends

export default router;