import {ActionCreators, ActionTypes} from "./actions";

describe('updateJwtToken is a function that: ', () => {
    it('should create an action to fetch jwt token', () => {
        const expectedAction = {
            type: ActionTypes.UPDATE_JWT_TOKEN,
            jwtToken: 'jwtToken'
        };

        expect(ActionCreators.updateJwtToken('jwtToken')).toEqual(expectedAction);
    })
});