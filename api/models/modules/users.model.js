import mongoose from "mongoose";

// schema User
const schemaUser = {
  phone:String,
  name: String,
  email: String,
  password: String,
  dniImage:String,
  dniImageId:String
};

// User model
const UserModel = mongoose.model("User", schemaUser, "users");

export default UserModel;
