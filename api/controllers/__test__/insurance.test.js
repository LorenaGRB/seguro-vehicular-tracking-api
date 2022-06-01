const axios = require('axios')

describe('Insurance tests', () => {
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
  const urlGetInsuranceByCar = (idCar) => `http://localhost:5002/api/data/insurance/byIdCar/${idCar}`
  const urlGetInsuranceByUser = (email) => `http://localhost:5002/api/data/insurance/${email}`
  const urlCreateInsurance = (email) => `http://localhost:5002/api/data/insurance/create/${email}`
  const urlUpdateById = (id) =>  `http://localhost:5002/api/data/insurance/update/${id}`

  const idCar = "62976f3733ba9bdff5d648c3"
  const idInsuranceToUpdate = "6297940e4d4df1a0da17fd60"
  //BODY
  const bodyCreateInsurance = {
    email: "prueba1@gmail.com",
    idCar: "62976f3733ba9bdff5d648c3",
    price: { 
      llantaRobada: true,
      choque: false,
      atropello: false,
      muerte:false,
      lesiones:false,
      carRobo:false,
      amount: 70
    }
}

  const bodyToUpdate = {
    price: {
      llantaRobada: true,
      choque: false,
      atropello: false,
      muerte: false,
      lesiones: false,
      carRobo: false,
      amount: 70
    },
    _id: '6297940e4d4df1a0da17fd60',
    email: 'prueba1@gmail.com',
    idCar: '62976f3733ba9bdff5d648c3',
    __v: 0
  }

  it('should create a insurance', async () => {
    const result = await axios.post(
      urlCreateInsurance(bodyCreateInsurance.email),
      bodyCreateInsurance,
      headerAuthorization
      )
      console.log(result.data)
      expect(result.status).toEqual(201);
      expect(result.data).toBeDefined();
      expect(result.data._id).toBeDefined();
      expect(result.data.email).toEqual(bodyCreateInsurance.email);
      expect(result.data.idCar).toEqual(bodyCreateInsurance.idCar);
      expect(result.data.price.llantaRobada).toEqual(bodyCreateInsurance.price.llantaRobada);
      expect(result.data.price.amount).toEqual(bodyCreateInsurance.price.amount);
  })

  it('shouldnt create a car if you missed the token AUTHENTICATION', async () => {
    const result = await axios.post(
      urlCreateInsurance(bodyCreateInsurance.email),
      bodyCreateInsurance
      ).catch(function (error) {
        return error.toJSON()
      });
      expect(result.status).toEqual(403);
  })
  
  it('should get insurance by user', async () => {
    const result = await axios.get(
      urlGetInsuranceByUser(bodyCreateInsurance.email),
      headerAuthorization
    )
    expect(result.status).toEqual(200);
    expect(result.data).toBeDefined();
  })  

  it('shouldnt get insurance by user if you missed the token AUTHENTICATION', async () => {
    const result = await axios.get(
      urlGetInsuranceByUser(bodyCreateInsurance.email),
    ).catch(function (error) {
        return error.toJSON()
      });
      expect(result.status).toEqual(403);
  })

  it('should get insurance by carId', async () => {
    const result = await axios.get(
      urlGetInsuranceByCar(idCar),
      headerAuthorization
    )
    console.log(result.data)
    expect(result.status).toEqual(200);
    expect(result.data).toBeDefined();
  })  

  it('shouldnt get insurance by user if you missed the token AUTHENTICATION', async () => {
    const result = await axios.get(
      urlGetInsuranceByCar(idCar),
    ).catch(function (error) {
        return error.toJSON()
      });
      expect(result.status).toEqual(403);
  })

  it('should update insurance by id', async () => {
    const result = await axios.put(
      urlUpdateById(idInsuranceToUpdate),
      bodyToUpdate,
      headerAuthorization,
    )
      console.log(result.data)
    expect(result.status).toEqual(200);
    expect(result.data).toBeDefined();
  })  

  it('shouldnt updated cars by user if you missed the token AUTHENTICATION', async () => {
    const result = await axios.put(
      urlUpdateById(idInsuranceToUpdate)
    ).catch(function (error) {
        return error.toJSON()
      });
      expect(result.status).toEqual(403);
  })
})