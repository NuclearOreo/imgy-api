# Update Profile

Update the Profile of the Authenticated User if and only if they are Owner.

**URL** : `/api/profiles/:`

**Method** : `PUT`

**Auth required** : YES, Auth Token

**Permissions required** : User is Account Owner

**Data constraints**

```json
{
	"firstname": "[String with min length of 3]",
	"lastname": "[String with min length of 3]",
	"street": "[String]",
	"city": "[String]",
	"state": "[String]",
	"zip": "[String of numbers]"
}
```

**Data example** 

```json
{
	"firstname": "Test",
	"lastname": "One",
	"street": "1234 SomeWhere Ave",
	"city": "New York City",
	"state": "New York",
	"zip": "12356"
}
```

## Success Responses

**Condition** : Update can be performed either fully or partially by the Owner
of the Account.

**Code** : `200 OK`

**Content example** :

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

## Error Response

**Code** : `400`


