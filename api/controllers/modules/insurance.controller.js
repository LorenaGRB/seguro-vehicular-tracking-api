import { InsuranceModel } from "../../models/index.js";


// Controller get insurances by user
export const getInsuranceByCar = async (req, res) => {
  try {
    const { carId: carId } = req.params;
    console.log(carId, req.body)
    const insurance = await InsuranceModel.find({ carId: carId });
    res.status(200).json(insurance);
  } catch (error) {
    res.status(403).json({ error });
  }
};

// Controller get insurances by user
export const getInsuranceByEmail = async (req, res) => {
  try {
    const { email: email } = req.params;
    const insurance = await InsuranceModel.find({ email: email });
    res.status(200).json(insurance);
  } catch (error) {
    res.status(403).json({ error });
  }
};

// Controller create one insurance
export const createInsurance = async (req, res) => {
  try {
    const { carId: carId } = req.params;
    const insurance = new InsuranceModel({ ...req.body, carId });
    const newInsurance = await insurance.save();
    newInsurance && res.status(201).json(newInsurance);
  } catch (error) {
    response.status(500).json({ error });
  }
};

export const findInsurance = async (req, res, next) => {
  const { id: id } = req.params;
  try {
    const insurance = await InsuranceModel.findById(id);
    if (insurance) {
      req.data = { insurance };
      next();
    } else {
      req.status(204).json({ error: "No insurance" });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const updateInsurance = async (req, res) => {
  const insuranceToUpdate = req.body;
  const { insurance } = req.data;

  try {
    InsuranceModel.updateOne(insurance, insuranceToUpdate, (error, updatedInsurance) => {
      if (!error) {
        res.status(200).json(updatedInsurance);
      } else res.status(500).send(error);
    });
  } catch (error) {
    res.status(500).send(error);
  }
};


