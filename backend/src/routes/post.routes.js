import express from "express";
import * as postController from "../controllers/post.controller.js";
import verifyToken from "../middlewares/verifyToken.mid.js"

const router = express.Router();

router.route('/all')
    .get(postController.getPosts)
router.route('/')
    .post(verifyToken, postController.createPost);
router.route('/:id')
    .get(postController.getPostById)
    .put(postController.updatePost)
    .delete(postController.deletePost);


export default router;