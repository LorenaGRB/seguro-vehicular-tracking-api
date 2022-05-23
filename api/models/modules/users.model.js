import mongoose from "mongoose";

// schema User
const schemaUser = {
  phone:String,
  plate:String,
  name: String,
  email: String,
  password: String,
};

// User model
const UserModel = mongoose.model("User", schemaUser, "users");

export default UserModel;
