import {isDev} from "./envService";

class ApiService {
    constructor() {
        this.apiBaseUrl = (isDev() ? 'https://localhost:4002' : '');
    }

    currentEnv() {
        return process.env.NODE_ENV;
    }

    jsonHeaders() {
        return {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        };
    }

    tokenAUrl(pod) {
        return `${this.apiBaseUrl}/auth/${pod}/tokenA`;
    };

    validateTokensUrl() {
        return `${this.apiBaseUrl}/auth/validateTokens`;
    };
}

export default new ApiService();
