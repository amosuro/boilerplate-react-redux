import symphonyWrapper from "../hooks/app";

export class ActionTypes {
    static UPDATE_JWT_TOKEN = 'UPDATE_JWT_TOKEN';
}

export class ActionCreators {
    static updateJwtToken(jwtToken) {
        return {
            type: ActionTypes.UPDATE_JWT_TOKEN,
            jwtToken
        }
    }
}

export const updateJwtTokenAsync = (appId, jwtEnabled) => {
    return (dispatch) => {
        symphonyWrapper.init(appId, jwtEnabled)
            .then(data => {
                if (data.jwtToken) {
                    dispatch(ActionCreators.updateJwtToken(data.jwtToken));
                }
            })
            .catch(error => {
                console.error('Could not fetch JWT token!', error);
            });
    };
};