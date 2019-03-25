# Delete User

Delete the User of the Authenticated User if they are Owner.

**URL** : `/api/users`

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
