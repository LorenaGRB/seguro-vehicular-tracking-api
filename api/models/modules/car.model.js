import mongoose from "mongoose";

// schema Cars
const schemaCars = { 
  email:String,
  car: { 
    insuredAmount: Number,
    carBrand: String,
    carYear: Number,
    onGas: Boolean,
    plate: String
  }
}

// Cars model
const CarModel = mongoose.model("Car", schemaCars, "car");

export default CarModel;
