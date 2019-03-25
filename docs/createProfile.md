# Create Profile

Create a new User

**URL** : `/api/profiles`

**Method** : `POST`

**Auth required** : YES, Auth Token

**Data constraints**

Provide name of Account to be created.

```json
{
	"firstname": "[Required: String with min length of 3]",
	"lastname": "[Required: String with min length of 3]",
	"street": "[String]",
	"city": "[String]",
	"state": "[String]",
	"zip": "[String of numbers]"
}
```

**Data example** All fields must be sent.

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

## Success Response

**Condition** : If everything is OK and an Profile didn't exist for this User.

**Code** : `200`

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

## Error Responses

**Code** : `400 BAD REQUEST`
