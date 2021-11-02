"use strict";
exports.__esModule = true;
exports.userValidate = void 0;
var ajv_1 = require("ajv");
var ajv = new ajv_1["default"]();
var user = {
    type: "object",
    properties: {
        username: { type: "string" },
        password: { type: "string" }
    },
    required: ['username', 'password'],
    additionalProperties: false
};
exports.userValidate = ajv.compile(user);
