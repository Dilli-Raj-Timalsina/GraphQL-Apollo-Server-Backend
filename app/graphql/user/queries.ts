import gql from "graphql-tag";

export const queries = `
    type Query {
        getJWTToken(email: String!, password: String!): String!
        getName:String!
    }
`;
