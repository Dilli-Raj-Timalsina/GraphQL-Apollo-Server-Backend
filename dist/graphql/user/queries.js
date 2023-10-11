"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.queries = void 0;
exports.queries = `
    type Query {
        getJWTToken(email: String!, password: String!): String!
        getName:String!
    }
`;
