import axios from "axios";
import apiService from "./ApiService";

class AuthService {
    getTokenA(pod) {
        return new Promise((resolve, reject) => {
            axios({
                url: apiService.tokenAUrl(pod),
                method: 'post',
                headers: apiService.jsonHeaders()
            })
                .then(response => {
                    resolve(response.data.tokenA);
                })
                .catch(error => {
                    reject(error);
                });
        });
    }

    validateTokens(tokenA, tokenS) {
        return axios({
            url: apiService.validateTokensUrl(),
            method: 'post',
            headers: apiService.jsonHeaders(),
            data: {tokenA, tokenS}
        });
    };
}

export default new AuthService();

