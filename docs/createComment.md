# Create Post

Create a new User

**URL** : `/api/posts/:postId`

**Method** : `POST`

**URL Parameters** : `postId=[string]` where `postId` is the post of the User.

**Auth required** : YES, Auth Token

**Data constraints**

Provide name of Account to be created.

```json
{
    "comment": "[String]"
}
```

**Data example** All fields must be sent.

```json
{
	"comment": "This is a nice picture"
}
```

## Success Response

**Condition** : If everything is OK.

**Code** : `200`

**Content example**

```json
{
    "_id": "5c9956b241a32752d242973a",
    "username": "test1",
    "postId": "5c99473c6027ee44c6b15a76",
    "comment": "This is a nice picture",
    "__v": 0
}
```

## Error Responses
**Condition** : If fields are missed.

**Code** : `400 BAD REQUEST`
