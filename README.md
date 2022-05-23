# FavsApi

Favs es una nueva empresa que tiene como objetivo brindar una mejor manera de organizar tus cosas favoritas: música, ropa, cursos, etc., todo en un solo lugar.
Favs Api te brinda la comunicación que proviene desde el backend. Esta se puede usar mediante una aplicación frontend (para desarrollar una aplicación) o por medio de postman (para realizar pruebas)
## I. Pasos a seguir para poder usar Favs Api
1. Clonar el repositorio en su computadora.
2. Ejecutar el siguiente comando en la terminal **```npm install```**
3. Ejecutar el comando **```npm run dev```** para realizar pruebas en el ambiente de desarrollo.
4. Ahora Favs api se estará ejecutando en su computadora.
## II. Si desea ejecutar las pruebas unitarias
1. Debe realizar los mismos pasos que se mencionan anterioremente solo que en el paso 3. el comando a correr es **```npm run server-test```** para realizar pruebas en el ambiente de test.
2. Se debe abrir otro terminal al mismo tiempo y correr el comando **```npm run test```**                                         
**NOTA**: Los archivos de testing se encuentran en las carpetas __ __test__ __
## III. Si desea tener un ejemplo de cómo usar Favs api se recomienda el uso con Postman:                    
1.  Importar en el postman el archivo "FavsApi.postman_collection.json" que se encuentra dentro de este repositorio.                                                 
**NOTA**:Recuerde que para poder realizar esto FavsApi debe estar corriendo siguiendo los pasos en **I**, y si desea ver el funcionamiento de FavsApi en el ambiente de test puede realizar los pasos de **I**, a excepción del paso 3, que debería correr : **```npm run server-test```** en vez de  **```npm run dev```**
## IV. Uso de la aplicación
1. Primero debe crearse un usuario o si ya lo tiene creado debe loguearse. Los endpoints a usar son:
* Crear usuario: 
  * Endpoint: ``` http://localhost:5000/auth/local/create ```
  * Body al crear usuario : {
    "email": "email@email.com",
    "password": "contraseña que prefiera"
}
* Login :
  * Endpoint ``` http://localhost:5000/auth/local/login ```
  * Body al loguearse:``` {
    "email": "email@email.com",
    "password": "contraseña que prefiera"
} ```
2. Luego puede usar cualquiera de los otros endpoints pero recuerde que debe activarse el header: Authorization cuyo valor es el del TOKEN que envía FavsApi al Loguearse a la aplicación. 
* Obtener todas las listas de favoritos: 
  * Endpoint: ``` http://localhost:5000/api/favs ```
  * Body (no tiene body)
* Obtener solo una lista de favoritos :
  * Endpoint ``` http://localhost:5000/api/favs/:id ``` **donde :id** vendría a ser el id de la lista de favoritos que desea ver.
  * Body (no tiene body)

* Crear una lista de favoritos :
  * Endpoint ``` http://localhost:5000/api/favs/create ``` 
  * Body ``` {
    "nameList": "animales",
    "favs": [
        {
            "title": "Gatos",
            "description": "Felinos domesticos",
            "link": "www.link.com"
        },
         {
            "title": "Vaca",
            "description": "Animal de granja que dice muuu",
            "link": "www.link.com"
        },
         {
            "title": "Perros",
            "description": "Mascotas domesticas por excelencia",
            "link": "www.link.com"
        }
    ]
} ``` NOTA: Tome este body como una referencia

* Eliminar solo una lista de favoritos :
  * Endpoint ``` http://localhost:5000/api/favs/delete/:id ``` **donde :id** vendría a ser el id de la lista de favoritos que desea eliminar.
  * Body (no tiene body)

