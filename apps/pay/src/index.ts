import express from "express";
import * as dotenv from "dotenv";
dotenv.config();
import { PORT } from "./config";
import { init, initServer } from './init';
import http from 'http';


const app = express();
const httpServer = http.createServer(app);

async function listen () {
    const server = await initServer(httpServer);
    await init(app, server);
    return new Promise<void>((resolve) => httpServer.listen({ port: PORT }, resolve));

}

listen().then((url) => {
    console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);
});



