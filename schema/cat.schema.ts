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
      "description": "date create time",
      "type": ""
    },
    "datemodified": {
      "description": "date modified time",
      "type": ""
    },
    "age": {
      "description": "age of cat",
      "type": ""
    },
    "color": {
      "description": "color of cat",
      "type": ""
    },
    "foundlocation": {
      "description": "where found the cat",
      "type": ""
    }
  },
  "required": ["name"]
}