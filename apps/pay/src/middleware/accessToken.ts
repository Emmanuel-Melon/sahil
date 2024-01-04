import axios from "axios";
import { apiKey, apiUser, subscriptionKey } from "../config";
export async function validateAccessToken(req, res, next) {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        // validate
    } else {
        const headers = {
            "Ocp-Apim-Subscription-Key": subscriptionKey,
            "Authorization": `Basic ${Buffer.from(`${apiUser}:${apiKey}`).toString("base64")}`
        }

        const response = await axios.post("https://sandbox.momodeveloper.mtn.com/collection/token/", {}, {
            headers
        });
        req.headers.access_token = response.data.access_token;
        //console.log(response.headers);
    }
    // req.locals.access_tokn = "yerrrrr";

    // No token in the request, generate a new access token
    // const newToken = dataSources.momoAPI.createAcccessToken();
    // req.headers.authorization = `Bearer ${newToken}`;
    next();
}