import { UserModel } from '../../models/index.js';
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const findUserByEmail = async (email) =>{
  const find = await UserModel.findOne({ email: email })
  return find
}

const createEncryptedUser = async (dataBody) => {
  const { password } = dataBody;
  console.log(dataBody)
  const hash = await bcrypt.hash(password, 10); 
  const newUser = new UserModel({ ...dataBody, password: hash });
  const user = await newUser.save();
  return user;
} 

const comparing = async  (password, currentPass) => {
  return await bcrypt.compare(password, currentPass)
};

const loginUser = async ({ email, password }) => {
  const user = await UserModel.findOne({ email });
  if (!user) return { code: 404, data: {} };
  const isEqPass = await comparing(password, user.password)
  const token = isEqPass? jwt.sign({ email: email }, process.env.ENV_SECRET_KEY,{
    expiresIn: "2h",
  }):''
  const isValidPass = isEqPass?{
    code: 200, 
    data: { 
      user:{
        email: user.email,
        name: user.name,
        phone:user.phone,
        plate: user.plate,
      }, 
      token:token 
    }} 
    : 
    { 
      code: 404, 
      data: {} 
    }
  return isValidPass
};

export { 
  findUserByEmail,
  createEncryptedUser, 
  loginUser
}