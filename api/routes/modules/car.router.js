import express from "express";

import { carCtrl } from "../../controllers/index.js";

import { validateToken } from "../../middlewares/index.js";

const { createCar, getCarsByUser, findCar, updateCar } = carCtrl;

const router = express.Router();

const carRoutes = {
  GET_CAR_BY_OWNER: "/car/:email",
  CREATE: "/car/create/:email",
  UPDATE: "/car/update/:id",
};


router.get(carRoutes.GET_CAR_BY_OWNER, validateToken, getCarsByUser);
router.post(carRoutes.CREATE, validateToken, createCar);
router.put(carRoutes.UPDATE, validateToken, findCar, updateCar);

export default router;