import { Router } from "express";
import verifyToken from "../middlewares/verifyToken.mid.js";
import * as userConroller from "../controllers/user.controller.js";

const router = Router();

router.route('/all')
    .get(userConroller.getAllUsers);

router.route('/')
    .get(userConroller.createUser);

router.route('/:id')
    .get(verifyToken, userConroller.getUserById)
    .put(verifyToken, userConroller.updateUser)
    .delete(verifyToken, userConroller.deleteUser);



export default router;