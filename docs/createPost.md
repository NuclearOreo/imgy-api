# Create Post

Create a new User

**URL** : `/api/posts/:username`

**Method** : `POST`

**URL Parameters** : `username=[string]` where `username` is the username of the User.

**Auth required** : YES, Auth Token

**Data constraints**

Provide name of Account to be created.

```json
{
    "imageUrl": "[String URL]"
}
```

**Data example** All fields must be sent.

```json
{
	"imageUrl": "https://images.unsplash.com/photo-1553315914-2177d4bb8cc5?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjF9"
}
```

## Success Response

**Condition** : If everything is OK.

**Code** : `200`

**Content example**

```json
{
    "comments": [],
    "_id": "5c99473c6027ee44c6b15a76",
    "imageUrl": "https://images.unsplash.com/photo-1553315914-2177d4bb8cc5?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjF9",
    "username": "test1",
    "__v": 0
}
```

## Error Responses
**Condition** : If fields are missed.

**Code** : `400 BAD REQUEST`
