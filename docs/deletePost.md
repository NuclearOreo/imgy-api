# Delete Profile

Delete the Profile of the Authenticated User if they are Owner.

**URL** : `/api/post/:id`

**URL Parameters** : `id=[string]` where `id` is the id of the Post on the
server.

**Method** : `DELETE`

**Auth required** : YES, Auth Token is needed

**Permissions required** : User is Account Owner

## Success Response

**Condition** : If the Account exists.

**Code** : `200`

**Content Example**  

```json
{
    "n": 1,
    "ok": 1,
    "deletedCount": 1
}
```

## Error Responses

**Condition** : If there's no Auth Token

**Code** : `400`
