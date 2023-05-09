export const cat = {
  "$schema": "http://json-schema.org/draft-04/schema#",
  "id": "/cat",
  "title": "Cat",
  "description": "An Cat in the Shelter",
  "type": "object",
  "properties": {
    "name": {
      "description": "name of cat",
      "type": "string"
    },
    "type": {
      "description": "tpye of cat",
      "type": "string"
    },
    "description": {
      "description": "cat description",
      "type": "string"
    },
    "imageuri": {
      "description": "URL for main image to show in cat list",
      "type": "uri"
    },
    "adopted": {
      "description": "Is the cat adpot or not",
      "type": "boolean"
    },
    "datecreated": {
      "description": "Is the cat adpot or not",
      "type": ""
    },
    "datemodified": {
      "description": "Is the cat adpot or not",
      "type": ""
    }
  },
  "required": ["name"]
}