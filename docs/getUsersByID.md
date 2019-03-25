# Show Single User

Show a single Users.

**URL** : `/api/users/id/:id`

**URL Parameters** : `id=[string]` where `ud` is the username of the User on the
server.

**Method** : `GET`

**Auth required** : None

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
    "_id": "5c99220e4094fb207094413c",
    "username": "test1",
    "email": "test1@gmail.com"
}
```