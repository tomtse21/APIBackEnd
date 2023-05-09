export const cat = {
  "$schema": "http://json-schema.org/draft-04/schema#",
  "id": "/cat",
  "title": "Article",
  "description": "An article in the blog",
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
    "decs": {
      "description": "cat description",
      "type": "string"
    },
    "url": {
      "description": "URL for main image to show in cat list",
      "type": "uri"
    },
    "adopt": {
      "description": "Is the cat adpot or not",
      "type": "boolean"
    }
  },
  "required": ["name"]
}