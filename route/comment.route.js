import express from "express";
import { createComment,getAllComments,deleteComments,upadteComment} from "../Controller/comment.controller.js";

const router = express.Router();

router.post('/create',createComment)
router.get('/getall',getAllComments);
router.delete('/delete',deleteComments);
router.put("/update",upadteComment);


export default router;