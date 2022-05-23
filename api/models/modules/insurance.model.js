import mongoose from "mongoose";

// schema Insurance
const schemaInsurance = { 
  email:String,
  idCar:String,
  price: { 
    llantaRobada: Boolean,
    choque: Boolean,
    atropello: Boolean,
    muerte:Boolean,
    lesiones:Boolean,
    carRobo:Boolean,
    amount: Number,
  }
}

// Insurance model
const InsuranceModel = mongoose.model("Insurance", schemaInsurance, "insurance");

export default InsuranceModel;
