import gql from "graphql-tag";

export const typedef = `
    #  radom  comments

    enum Role {
        STUDENT
        TEACHER
        ADMIN
    }
    type User {
        id: String
        name: String!
        email: String!
        password: String!
        contact: Int
        profileURL: String
        role: Role!
    }

    type Course {
        id: String
        title: String!
        subTitle: String!
        language: String!
        price: Float!
        descriptions: String
    }
   
`;
