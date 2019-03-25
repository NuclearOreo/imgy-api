# Show Single Post

Show a single Post.

**URL** : `/api/posts/:username`

**URL Parameters** : `username=[string]` where `username` is the username of the Post on the
server.

**Method** : `GET`

**Auth required** : None

## Success Response

**Code** : `200 OK`

**Content example**

```json
[
    {
        "comments": [],
        "_id": "5c99473c6027ee44c6b15a76",
        "imageUrl": "https://images.unsplash.com/photo-1553315914-2177d4bb8cc5?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjF9",
        "username": "test1",
        "__v": 0
    }
]
```