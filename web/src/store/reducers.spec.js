import {jwtToken as jwtTokenReducer} from "./reducers";
import {ActionTypes} from "./actions";

describe('jwtToken reducer is a function that: ', () => {
    it('should handle UPDATE_JWT_TOKEN', () => {

        const result = jwtTokenReducer('currentToken', {type: ActionTypes.UPDATE_JWT_TOKEN, jwtToken: 'newToken'});
        expect(result).toEqual('newToken');
    });
});