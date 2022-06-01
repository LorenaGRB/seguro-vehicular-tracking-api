
const axios = require('axios')

describe('userTest', () => {

  //URL
  const urlCreateUser = "http://localhost:5002/api/users/create";
  const urlLogin = "http://localhost:5002/api/users/login";

  //Body (IF YOU WANT TO PROBE CREATEUSER YOU HAVE TO CHANGE THE EMAIL)
  const bodyTestCreate = {
    phone:"978929269",
    name:"Lorena Rojas",
    email:"prueba7@gmail.com",
    password:"Contrasena123",
    dniImage:"https://res.cloudinary.com/dhouvtp2c/image/upload/v1653334961/kjbiqwax79sacrapfhi7.png",
    dniImageId:"kjbiqwax79sacrapfhi7"
  }

  const bodyTestLogin= {
    email:"prueba1@gmail.com",
    password:"Contrasena123"
  }
  
  //Don´t change this const
  const bodyTestFalse = {
    email: "test@gmail.com",
    password: "123"
  }

 //Body (IF YOU WANT TO PROBE CREATEUSER YOU HAVE TO CHANGE THE EMAIL OF THE BODYTEST)
  it('should create a new user ', async() => {
    const result = await axios.post(
      urlCreateUser,
      bodyTestCreate
      )
      console.log(result)
      expect(result.status).toEqual(201);
      expect(result.data).toBeDefined();
      expect(result.data.email).toBe(bodyTestCreate.email);
  });

  
  it('shouldnt permit to create a new user ', async() => {
    const result = await axios.post(
      urlCreateUser,
      bodyTestCreate
      ).catch(function (error) {
        return error.toJSON()
      });
      expect(result.status).toEqual(500);
  });

  it('should login and obtein token', async () => {
    const result = await axios.post(
      urlLogin,
      bodyTestLogin
      )
      expect(result.status).toEqual(200);
      expect(result.data.token).toBeDefined();
  });
  
  it('shouldnt permit to login ', async() => {
    const result = await axios.post(
      urlLogin,
      bodyTestFalse
      ).catch(function (error) {
        return error.toJSON()
      });
      expect(result.status).toEqual(404);
  });
})


