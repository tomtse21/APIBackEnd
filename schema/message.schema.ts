export const message = {
    "$schema": "http://json-schema.org/draft-04/schema#",
    "id": "/message",
    "title": "Message",
    "description": "Message",
    "type": "object",
    "properties": {
      "name": {
        "description": "Name",
        "type": "string"
      },
      "email": {
        "description": "Email",
        "type": "string"
      },
      "cats_id": {
        "description": "Cat Id",
        "type": "serial4"
      },
      "message": {
        "description": "message content",
        "type": "string"
      },
      "dateregistered": {
        "description": "reg time",
        "type": ""
      },
      "reply_content": {
        "description": "reply content",
        "type": "string"
      },
    },
    "required": ["cats_id", "message","email"]
  }