import { Router } from "express";
import verifyToken from "../middlewares/verifyToken.mid.js";
import * as userConroller from "../controllers/user.controller.js";

const router = Router();

router.route('/all')
    .get(verifyToken, userConroller.getAllUsers);

router.route('/register')
    .post(userConroller.registerUser);

router.route('/guest')
    .post(userConroller.guestUser);

router.route('/guest/logout')
    .get(verifyToken, userConroller.logoutGuest);

router.route('/login')
    .post(userConroller.loginUser);

router.route('/logout')
    .get(verifyToken, userConroller.logoutUser);

router.route("/verify")
    .get(verifyToken, userConroller.verifyTokenCont);

router.route('/:id')
    .get(verifyToken, userConroller.getUserById)
    .put(verifyToken, userConroller.updateUser)
    .delete(verifyToken, userConroller.deleteUser);

export default router;