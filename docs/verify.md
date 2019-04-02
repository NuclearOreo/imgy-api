# Verify

Verify token

**URL** : `/api/auth/verify`

**Method** : `POST`

**Auth required** : NO

**Data constraints**

```json
{
    "token": "[JsonWebToken]"
}
```

**Data example**

```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
}
```

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
  "sub": "1234567890",
  "name": "John Doe",
  "iat": 1516239022
}
```

## Error Response

**Condition** : if token is invalid.

**Code** : `400 BAD REQUEST`
