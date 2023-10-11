"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mutations = void 0;
exports.mutations = `
    type Mutation {
        createUser(
            name: String!
            email: String!
            password: String!
            contact: Int
            profileURL: String
            role: Role!
        ): User

        createCourse(
            title: String!
            subTitle: String!
            language: String!
            price: Float!
            descriptions: String!
        ): Course
    }
`;
