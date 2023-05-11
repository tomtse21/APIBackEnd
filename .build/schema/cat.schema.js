"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var cat_schema_exports = {};
__export(cat_schema_exports, {
  cat: () => cat
});
module.exports = __toCommonJS(cat_schema_exports);
const cat = {
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
      "type": "bytea"
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
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  cat
});
//# sourceMappingURL=cat.schema.js.map
