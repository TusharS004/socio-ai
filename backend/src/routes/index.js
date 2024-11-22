import { Router } from "express";
import prodRoutes from "./product.routes.js";
import userRoutes from "./user.routes.js";
import postRoutes from "./post.routes.js";

const router = Router();

router.use('/users', userRoutes);
router.use('/posts', postRoutes);
router.use('/products', prodRoutes);

export default router;