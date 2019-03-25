# Show Single Profile

Show a single Profile.

**URL** : `/api/profiles/:username`

**URL Parameters** : `username=[string]` where `username` is the username of the Profile on the
server.

**Method** : `GET`

**Auth required** : None

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
    "_id": "5c992e2e12c4612f13ae8a2d",
    "userId": "5c99220e4094fb207094413c",
    "username": "test1",
    "firstname": "Test",
    "lastname": "One",
    "street": "1234 SomeWhere Ave",
    "city": "New York City",
    "state": "New York",
    "zip": 12356,
    "__v": 0
}
```