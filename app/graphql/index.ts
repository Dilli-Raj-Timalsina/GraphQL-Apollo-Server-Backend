import { ApolloServer } from "@apollo/server";
import User from "./user";

async function createApolloGraphqlServer() {
    const gqlServer = new ApolloServer({
        typeDefs: ` ${User.typedef}  ${User.queries} ${User.mutations}`,

        resolvers: {
            Query: {
                ...User.resolvers.queries,
            },
            Mutation: {
                ...User.resolvers.mutations,
            },
        },
    });

    // Start the gql server
    await gqlServer.start();

    return gqlServer;
}

export default createApolloGraphqlServer;
