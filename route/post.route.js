import express from "express";
import { createPost, toggleLike, getPost, getAllPosts } from "../Controller/post.controller.js";

const router = express.Router();

router.post("/create", createPost);
router.post("/:postId/like", toggleLike);
router.get("/:postId", getPost);
router.get("/all", getAllPosts);

export default router;
