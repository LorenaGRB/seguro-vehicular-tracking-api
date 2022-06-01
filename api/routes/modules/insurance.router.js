import express from "express";

import { insuranceCtrl } from "../../controllers/index.js";

import { validateToken } from "../../middlewares/index.js";

const { createInsurance, getInsuranceByCar, findInsurance, updateInsurance, getInsuranceByEmail } = insuranceCtrl;

const router = express.Router();

const insuranceRoutes = {
  GET__ALL_BY_EMAIL: "/insurance/:email",
  GET_BY_CAR: "/insurance/byIdCar/:carId",
  CREATE: "/insurance/create/:carId",
  UPDATE: "/insurance/update/:id",
};

router.get(insuranceRoutes.GET__ALL_BY_EMAIL, validateToken, getInsuranceByEmail);
router.get(insuranceRoutes.GET_BY_CAR, validateToken, getInsuranceByCar);
router.post(insuranceRoutes.CREATE, validateToken, createInsurance);
router.put(insuranceRoutes.UPDATE, validateToken, findInsurance, updateInsurance);

export default router;