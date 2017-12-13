import apiService from "./ApiService";

describe('ApiService.jsonHeaders is a method that', () => {
    it('should return the correct json headers', () => {
        const expectedHeaders = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        };

        expect(apiService.jsonHeaders()).toEqual(expectedHeaders);
    });
});

describe('ApiService.tokenAUrl is a method that', () => {
    it('should return the correct url for tokenA', () => {
        apiService.apiBaseUrl = 'https://localhost:4002';

        const expectedUrl = 'https://localhost:4002/auth/mock-pod/tokenA';

        expect(apiService.tokenAUrl('mock-pod')).toEqual(expectedUrl);
    });
});

describe('ApiService.validateTokensUrl is a method that', () => {
    it('should return the correct url for validateTokens', () => {
        apiService.apiBaseUrl = 'https://localhost:4002';

        const expectedUrl = 'https://localhost:4002/auth/validateTokens';

        expect(apiService.validateTokensUrl()).toEqual(expectedUrl);
    });
});