# Create User

Create a new User

**URL** : `/api/users`

**Method** : `POST`

**Auth required** : None

**Data constraints**

Provide name of Account to be created.

```json
{
    "username": "[string with min length of 3]",
    "email": "[string, must be a valid email]",
    "password": "[string with min length of 5]"
}
```

**Data example** All fields must be sent.

```json
{
	"username": "billy",
	"email": "billy@gmail.com",
	"password": "12345"
}
```

## Success Response

**Condition** : If everything is OK and an User didn't exist.

**Code** : `200`

**Content example**

```json
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjOTkyN2Q2ZWIzNzMxMjczYzU3OGYzMSIsInVzZXJuYW1lIjoiYmlsbHkiLCJlbWFpbCI6ImJpbGx5QGdtYWlsLmNvbSIsImlhdCI6MTU1MzU0MTA3OH0.0idd1xnevvEsmX-GxU3ZI4_tkDU-We5jyf-cDM1Lp9M
```

## Error Responses
**Condition** : If fields are missed or user exists

**Code** : `400 BAD REQUEST`
