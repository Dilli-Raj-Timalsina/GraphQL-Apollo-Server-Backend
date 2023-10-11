"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mutations_1 = require("./mutations");
const queries_1 = require("./queries");
const resolvers_1 = require("./resolvers");
const typedef_1 = require("./typedef");
const User = { mutations: mutations_1.mutations, queries: queries_1.queries, resolvers: resolvers_1.resolvers, typedef: typedef_1.typedef };
exports.default = User;
