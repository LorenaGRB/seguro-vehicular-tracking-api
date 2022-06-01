const axios = require('axios')

describe('Car tests', () => {
//Initialization of variables
  //HEADER
  let headerAuthorization = "";
  beforeAll( async ()=>{
    // Login to get token
    const urlLogin = "http://localhost:5002/api/users/login";
    const bodyTestLogin= {
      email:"prueba1@gmail.com",
      password:"Contrasena123"
    }
    const login = await axios.post(
      urlLogin, 
      bodyTestLogin
    );
    const { token } = login.data;
    
    headerAuthorization = {
      headers:{
      Authorization: `Bearer ${token}`
      }
    }
  })

  //URL
  const urlGetCarByUser = (email) => `http://localhost:5002/api/data/car/${email}`
  const urlCreateCar = (email) => `http://localhost:5002/api/data/car/create/${email}`
  const urlUpdateById = (id) =>  `http://localhost:5002/api/data/car/update/${id}`

  const idToUpdate = "62976f3733ba9bdff5d648c3"
  //BODY
  const bodyCreateCar = {
    email:"prueba1@gmail.com",
    car: { 
      plate:'eyt345',
      insuredAmount: 15000,
      carBrand: "BWM",
      carYear: 2016,
      onGas: true
    }
  }

  const bodyToUpdate = {
    email:"prueba1@gmail.com",
    car: { 
      plate:'eyt345',
      insuredAmount: 15000,
      carBrand: "Audi",
      carYear: 2016,
      onGas: true
    }
  }

  it('should create a car', async () => {
    const result = await axios.post(
      urlCreateCar(bodyCreateCar.email),
      bodyCreateCar,
      headerAuthorization
      )
      console.log(result.data)
      expect(result.status).toEqual(201);
      expect(result.data).toBeDefined();
      expect(result.data._id).toBeDefined();
      expect(result.data.email).toEqual(bodyCreateCar.email);
      expect(result.data.car.plate).toEqual(bodyCreateCar.car.plate);
      expect(result.data.car.insuredAmount).toEqual(bodyCreateCar.car.insuredAmount);
      expect(result.data.car.onGas).toEqual(bodyCreateCar.car.onGas);
  })

  it('shouldnt create a car if you missed the token AUTHENTICATION', async () => {
    const result = await axios.post(
      urlCreateCar(bodyCreateCar.email),
      bodyCreateCar
      ).catch(function (error) {
        return error.toJSON()
      });
      expect(result.status).toEqual(403);
  })
  
  it('should get cars by user', async () => {
    const result = await axios.get(
      urlGetCarByUser(bodyCreateCar.email),
      headerAuthorization
    )
    expect(result.status).toEqual(200);
    expect(result.data).toBeDefined();
  })  

  it('shouldnt get cars by user if you missed the token AUTHENTICATION', async () => {
    const result = await axios.get(
      urlGetCarByUser(bodyCreateCar.email)
    ).catch(function (error) {
        return error.toJSON()
      });
      expect(result.status).toEqual(403);
  })

  it('should update cars by id', async () => {
    const result = await axios.put(
      urlUpdateById(idToUpdate),
      bodyToUpdate,
      headerAuthorization,
    )
    expect(result.status).toEqual(200);
    expect(result.data).toBeDefined();
  })  

  it('shouldnt updated cars by user if you missed the token AUTHENTICATION', async () => {
    const result = await axios.put(
      urlUpdateById(idToUpdate)
    ).catch(function (error) {
        return error.toJSON()
      });
      expect(result.status).toEqual(403);
  })
})