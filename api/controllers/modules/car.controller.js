import { CarModel } from "../../models/index.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

// Controller get cars by user
export const getCarsByUser = async (req, res) => {
  try {
    const { email: email } = req.params;
    const car = await CarModel.find({ email: email });
    res.json(car);
  } catch (error) {
    res.status(403).json({ error });
  }
};

// Controller create one car
export const createCar = async (req, res) => {
  try {
    const { email: email } = req.params;
    console.log(email)
    const car = new CarModel({ ...req.body, email });
    const newCar = await car.save();
    newCar && res.status(201).json(newCar);
  } catch (error) {
    response.status(500).json({ error });
  }
};

export const findCar = async (req, res, next) => {
  const { id: id } = req.params;
  console.log(id)
  try {
    const car = await CarModel.findById(id);
    if (car) {
      req.data = { car };
      next();
    } else {
      req.status(204).json({ error: "No car" });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const updateCar = async (req, res) => {
  const carToUpdate = req.body;
  const { car } = req.data;

  try {
    CarModel.updateOne(car, carToUpdate, (error, updatedCar) => {
      if (!error) {
        res.status(200).json(updatedCar);
      } else res.status(500).send(error);
    });
  } catch (error) {
    res.status(500).send(error);
  }
};


