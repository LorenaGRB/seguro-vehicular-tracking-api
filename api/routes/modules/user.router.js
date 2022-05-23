import express from "express";

import { userCtrl } from "../../controllers/index.js";

const {
  createUser,
  login
} = userCtrl;

const router = express.Router();

const userRoutes = {
  CREATE: "/create",
  LOGIN: "/login",
};

router.post(userRoutes.CREATE, createUser);
router.post(userRoutes.LOGIN, login);

export default router;
