# Movie-Match

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
