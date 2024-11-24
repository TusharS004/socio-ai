import express from "express";
import * as postController from "../controllers/post.controller.js";
import verifyToken from "../middlewares/verifyToken.mid.js"
import { getPost } from "../controllers/getPost.controller.js";
import upload from "../middlewares/upload.multer.js";

const router = express.Router();

router.route('/all')
    .get(postController.getPosts)

router.route('/url')
    .post(upload.array('assets'), verifyToken, getPost, postController.createPost);

router
    .route('/')
    .post(upload.array('assets'), verifyToken, postController.createPost);

router.route('/:id')
    .get(postController.getPostById)
    .put(verifyToken, postController.updatePost)
    .delete(verifyToken, postController.deletePost);


export default router;