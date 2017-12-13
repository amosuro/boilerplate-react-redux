import axios from "axios";
import MockAdapter from "axios-mock-adapter";

import AuthService from "./AuthService";
import apiService from "./ApiService";

describe('AuthService.getTokenA is a method that', () => {
    let pod, responseMock;

    beforeEach(() => {
        pod = 'mock-pod';
        responseMock = new MockAdapter(axios);
    });

    it('should return tokenA property from a successful response', (done) => {
        responseMock.onPost(apiService.tokenAUrl(pod)).reply(200, {
            tokenA: 'mock-token'
        });

        AuthService.getTokenA(pod).then(response => {
            expect(response).toEqual('mock-token');
            done();
        });
    });
});

describe('AuthService.validateTokens is a method that', () => {
    let tokenA, tokenS, responseMock;

    beforeEach(() => {
        tokenA = 'mock-token-1';
        tokenS = 'mock-token-2';
        responseMock = new MockAdapter(axios);
    });

    it('should return axios success response', (done) => {
        responseMock.onPost(apiService.validateTokensUrl()).reply(200, {woo: 'wooo'});

        AuthService.validateTokens(tokenA, tokenS).then(response => {
            expect(response.status).toEqual(200);
            done();
        });
    });
});