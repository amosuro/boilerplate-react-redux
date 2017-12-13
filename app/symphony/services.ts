import {symphonyServices} from "./symphony-services";
import AppSettings from "./app-settings";
import {UserInfoState} from "../models";
import {getUserProfile, REC_POSTINGS, REC_USER_PROFILE} from "../components/postings/Main/Main";

declare const SYMPHONY: any;

console.log("App Data - appId=" + AppSettings.getAppId() + ", appTitle=" + AppSettings.getAppTitle());

export const initApp = () => (dispatch, getState) => {
    SYMPHONY.remote.hello().then(function (data) {
        console.log("App Flow - hello()", data);

        symphonyServices.setTheme(data.themeV2);

        SYMPHONY.application
            .connect(AppSettings.getAppId(), ['ui', 'modules', 'applications-nav', 'extended-user-info', 'share'], [AppSettings.getControllerId()])
            .then(connectResponse => {
                console.log("App Flow - Connected", connectResponse);

                symphonyServices.init();

                dispatch({type: GET_USER_INFO});

                symphonyServices.getUserInfo()
                    .then((userInfo) => {
                        dispatch({type: STORE_USER_INFO, userInfo});

                        getUserProfile(true).then((r) => {
                            dispatch({type: REC_USER_PROFILE, userProfile: r.body.userProfile});
                            dispatch({type: REC_POSTINGS, postings: r.body.postings});
                        });
                    })
                    .fail((e) => {
                        dispatch({type: GET_USER_INFO_FAIL, e});
                    })
            });
    })
};

export const GET_USER_INFO = "GET_USER_INFO";
export const STORE_USER_INFO = "STORE_USER_DETAILS";
export const GET_USER_INFO_FAIL = "GET_USER_INFO_FAIL";
export const user_info_state = (state: UserInfoState = UserInfoState.DEFAULT_STATE, action): UserInfoState => {
    switch (action.type) {
        case GET_USER_INFO: {
            console.log("App Flow - Fetching JWT");
            return UserInfoState.DEFAULT_STATE;
        }
        case STORE_USER_INFO: {
            console.log("App Flow - Saving user info into the store", action.userInfo);
            return new UserInfoState(action.userInfo, false);
        }
        case GET_USER_INFO_FAIL: {
            console.log("App Flow - Fetching JWT failed", action.e);
            return new UserInfoState(null, false);
        }
        default:
            return state;
    }
};

//-----------------------------
let count = 0;
let displayPostingCount = undefined;
export const incrementCount = () => (dispatch, getState) => {
    let currPostingsCount = getState().postings_state.postings.length;
    if (displayPostingCount != undefined) {
        if (currPostingsCount > displayPostingCount) {
            count = count + (currPostingsCount - displayPostingCount);
            symphonyServices.setLeftNavMenuCounter(count);
        }
    }
    displayPostingCount = currPostingsCount;
};