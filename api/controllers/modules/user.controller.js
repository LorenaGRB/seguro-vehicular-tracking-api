import { userServices } from "../../services/index.js";

const { 
  findUserByEmail,
  createEncryptedUser, 
  loginUser
} = userServices;

export const createUser = async(req, res) => {
  try {
    const {  email:email } = req.body;
    const exist_user = await findUserByEmail( email);
    if (exist_user) throw new Error();

    const user = await createEncryptedUser({ ...req.body });
    console.log('user',user)
    user && res.status(201).json(user);
  } catch (error) {
    res.status(500).send();
  }
};


export const login = async (req, res) => {  
  
  try {console.log(req.body)
    const { code, data } = await loginUser(req.body);
    
    res.status(code).send(data);
  } catch (error) {
    res
      .status(400)
      .send({ error });
  }
};
