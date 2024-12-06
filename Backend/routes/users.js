import express from 'express'
import { updateUser, getSingleUser,deleteUser, getAllUser} from '../Controllers/UserController.js'

const router = express.Router();

import {verifyUser }from "../utils/verifyToken.js";
import {verifyAdmin }from "../utils/verifyToken.js";

router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
router.get("/:id",verifyUser,  getSingleUser);
router.get("/",verifyAdmin,getAllUser);

export default router;