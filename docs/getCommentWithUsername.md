# Show Comments

Show a Comment from a Specific User.

**URL** : `/api/commets/username/:username`

**URL Parameters** : `username=[string]` where `username` is the username of the Comments on the
server.

**Method** : `GET`

**Auth required** : None

## Success Response

**Code** : `200 OK`

**Content example**

```json
[
    {
        "_id": "5c9956b241a32752d242973a",
        "username": "test1",
        "postId": "5c99473c6027ee44c6b15a76",
        "comment": "This is a nice picture",
        "__v": 0
    }
]
```