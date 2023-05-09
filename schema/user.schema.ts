export const user = {
    "$schema": "http://json-schema.org/draft-04/schema#",
    "id": "/user",
    "title": "User",
    "description": "User information",
    "type": "object",
    "properties": {
      "firstname": {
        "description": "User first name",
        "type": "string"
      },
      "lastname": {
        "description": "User last name",
        "type": "string"
      },
      "about": {
        "description": "About user",
        "type": "string"
      },
      "dateregistered": {
        "description": "reg time",
        "type": ""
      },
      "password": {
        "description": "password",
        "type": "string"
      },
      "passwordsalt": {
        "description": "oasswird salt",
        "type": "string"
      },
      "email": {
        "description": "emaill of user",
        "type": "datetime"
      },     
      "avatarurl": {
        "description": "nth",
        "type": "string"
      },
      "usertype":{
        "description": "emaill of user",
        "type": "string"
      }
    },
    "required": ["username", "password"]
  }