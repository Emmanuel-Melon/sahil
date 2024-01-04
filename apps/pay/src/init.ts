import express from "express";
import { ApolloServer } from '@apollo/server';
import cors from 'cors';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { typeDefs } from "./typeDefs";
import { resolvers } from "./resolvers";
import { MomoAPI, MomoAuthAPI } from "./dataSources";
import { apiKey } from "./config";
import { validateAccessToken } from "./middleware/accessToken";

interface ContextValue {
    dataSources: {
        momoAPI: MomoAPI;
        momoAuthAPI: MomoAuthAPI
    };
}

export async function initServer(httpServer): Promise<any> {
    const server = new ApolloServer({
        introspection: true,
        typeDefs: typeDefs,
        resolvers,
        plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],

    });
    await server.start();
    return server;
}

export const init = (app, server) => {



    app.use(
        '/graphql',
        cors<cors.CorsRequest>(),
        express.json(),
        validateAccessToken,
        expressMiddleware(server, {
            context: async ({ req }) => {

                console.log('context');
                const { cache } = server;
                const momoAPI = new MomoAPI({ cache, key: apiKey, token: req.headers?.access_token });
                console.log(momoAPI);
                const momoAuthAPI = new MomoAuthAPI({ cache, key: apiKey });

     
                console.log("*******");
                console.log(momoAuthAPI);
                return ({
                    dataSources: {
                        momoAPI,
                        momoAuthAPI
                    }
                })
            }
        })
    );
}