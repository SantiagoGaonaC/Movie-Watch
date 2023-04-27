# Movie-Match

The objective of this project is to make it easier for individuals to search for movies that best fit their preferred genres. Through an authentication system that allows access to the movie management system, within which any movie can be entered and recommended according to its purpose.

# Recipe's API

This repository contains the implementation of the Recipe's Diary API.

## Development

1. Install Docker (In windows Install **Docker Desktop**)
2. Clone this repository (If credentials required contact Repository responsible **Santiago Gaona**)

```shell
git clone https://github.com/SantiagoGaonaC/Movie-Watch.git
```

3. Move inside the cloned repository

```shell
cd "Movie-Watch"
```

4. Start the server

```
docker compose -f ./dev.docker-compose.yaml up -d
```

> If you want to stop the server

```
docker compose -f ./dev.docker-compose.yaml down --remove-orphans --rmi all -v
```

## Production

1. Install Docker (In windows Install **Docker Desktop**)
2. Clone this repository (If credentials required contact Repository responsible **Santiago Gaona**)

```shell
git clone https://github.com/SantiagoGaonaC/Movie-Watch.git
```

3. Move inside the cloned repository

```shell
cd "Movie-Watch"
```

4. Update the credentials in the `mongo-initdb.d/mongo-init.js`

5. Create a valid `.env` . For example in the root of this repository:

```
# For the compose
MONGO_INITDB_ROOT_USERNAME=root
MONGO_INITDB_ROOT_PASSWORD=UPDATE_THIS_PASSWORD
MONGO_INITDB_DATABASE=RecipeDiary
# For the API
APIMOVIE_KEY=0ec1ba1856d84957804796d5cb1ef800
JWT_SECRET=UPDATE_THIS_SECRET
CONNECTION_DB=mongodb://recipeadmin:UPDATE_THIS_PASSWORD@mongo/Movie-Watch?retryWrites=true&w=majority
IP=0.0.0.0
PORT=4001
```

5. Start the server

```
docker compose --env-file .env up -d
```

6. Routes SV
   
   ```
   sudo su
   root@recipediary: ?
   ```

---

# Movie Watch API

# ***Register,Login,Logout,ID/Profile***

## Register

## (POST /api/register)

The password is saved on the server in encrypted form

```json
{
  "username": "usuarioprueba",
  "password": "contraseña123",
  "name": "Prueba",
  "lastName": "Pérez"
}
```

Response successfully:

```json
{
    "message": "El usuario se ha registrado con éxito"
}
```

If the user is already registered

```json
{
    "message": "El usuario ya existe"
}
```

If an error occurs when registering the user

```json
{
    "message": "Ha ocurrido un error al registrar el usuario"
}
```

## Login

## (POST /api/login)

The above record is taken as an example

```json
{
  "username": "usuarioprueba",
  "password": "contraseña123"
}
```

Response successfully:

```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDMxYjYyMzhjMDIzOTE1YzQ0YzJmMzciLCJpYXQiOjE2ODEwODk2OTZ9.Lrw-W0lPPxbBXbeCPmYJzZXtW2mAV5nmt6HTZ5UBFxY"
}
```

If an error occurs when login the user:

```json
{
    "token": "El usuario no existe"
}
```

```json
{
    "token": "El usuario o la contraseña son incorrectos"
}
```

## Logout

## (POST /api/logout)

The token/Headers of Authorization must be passed to you

Example:

```json
Authorization = Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDQ0YTRjMzg1MDI2YjA5MWIwY2U1YjQiLCJpYXQiOjE2ODIyMjAyNzAsImV4cCI6MTY4MjI2MzQ3MH0.txoDCxnL1uQ97BxbKfbCA-2L3IeLh6ww078R3g3bFQQ
```

Response successfully:

```json
{
    "message": "Sesión cerrada exitosamente"
}
```

## ID-Profile

## (GET /api/profile)

The token/Headers of Authorization must be passed to you

Example:

```json
Authorization = Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDQ0YTRjMzg1MDI2YjA5MWIwY2U1YjQiLCJpYXQiOjE2ODIyMjAyNzAsImV4cCI6MTY4MjI2MzQ3MH0.txoDCxnL1uQ97BxbKfbCA-2L3IeLh6ww078R3g3bFQQResponse successfully:
```

Response successfully:

```json
{
    "name": "Juan",
    "lastName": "Pérez"
}
```

---

# Movie System API
