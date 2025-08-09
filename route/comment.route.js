import express from "express";
import { createComment,getAllComments,deleteComments,upadteComment} from "../Controller/comment.controller.js";

const router = express.Router();

router.post('/comments',createComment)
router.get('/comments',getAllComments);
router.delete('/comments',deleteComments);
router.put("/comments",upadteComment);


export default router;