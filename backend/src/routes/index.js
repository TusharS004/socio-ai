import { Router } from "express";
import prodRoutes from "./product.routes.js";
import userRoutes from "./user.routes.js";
import postRoutes from "./post.routes.js";
import { getPost } from '../controllers/getPost.controller.js';

const router = Router();

router.get('/', (req, res) => {
    res.send('API is Running.');
});

router.use('/users', userRoutes);
router.use('/posts', postRoutes);
router.use('/products', prodRoutes);
router.post('/url', getPost);

export default router;