import {symphonyServices} from "../symphony/symphony-services";
import * as fetch from "isomorphic-fetch";

export const fetchWrapper = (url: string, method: string = 'GET', body?: any) => {
    return fetch(url, {
        headers: {
            'Pragma': 'no-cache', // cache header param required to work on Internet Explorer
            'Cache-Control': 'no-cache', // cache header param required to work on Internet Explorer
            'content-type': 'application/json',
            'jwt': symphonyServices.getJwt()
        },
        method,
        body
    });
};