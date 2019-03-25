# Show Single Comment

Show a single Comment.

**URL** : `/api/comments/:id`

**URL Parameters** : `id=[string]` where `id` is the Comment.

**Method** : `GET`

**Auth required** : None

## Success Response

**Code** : `200 OK`

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