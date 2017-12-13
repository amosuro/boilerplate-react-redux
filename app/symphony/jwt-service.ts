import * as jwtmodel from "./jwt-model";
import * as apiModel from "../api/api_model";
declare var require: any;
var fetch = require('isomorphic-fetch');
const API_AUTHENTICATE = "/api/authenticate";
const API_AUTHENTICATE_VALIDATE_TOKENS = "/api/authenticate/validate-tokens";
const API_AUTHENTICATE_JWT_TOKEN_INFO = "/api/authenticate/jwtTokenInfo";
// Kicks off app authentication flow at server.  Passes pod ID which came from 'hello' call previously.
// Returns Symphony token.
export const authenticate = () => apiModel.postData(API_AUTHENTICATE, {})
    .then(json => jwtmodel.AppData.fromJson(json));

export const validateTokens = (appId: string, tokenA: string, tokenS: string) => {
    let validateRequest = {
        appId: appId,
        tokenA: tokenA,
        tokenS: tokenS,
    };
    return apiModel.postData(API_AUTHENTICATE_VALIDATE_TOKENS, validateRequest)
        .then(json => {
            // console.log(API_AUTHENTICATE_VALIDATE_TOKENS + " response->", json);
            return json;
        });
};
