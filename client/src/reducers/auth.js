import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOG_OUT,
} from "../costants";

const initialState = {
    // even if we refresh the page. this reducer will run before
    // creating store and rendering DOM, token will be fetched
    // as long as there is a token in local storage
    token: localStorage.getItem("token"),
    isAuthenticated: false,
    loading: true,
    user: null,
};

const auth = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            // console.log("register/login sucess");
            return {
                ...state,
                token: payload.token,
                loading: false,
                isAuthenticated: true,
            };
        case USER_LOADED:
            return {
                ...state,
                user: payload,
                loading: false,
                isAuthenticated: true,
            };
        case REGISTER_FAIL:
        case AUTH_FAIL:
        case LOGIN_FAIL:
        case LOG_OUT:
            localStorage.removeItem("token");
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false,
                user: null,
            };
        default:
            return state;
    }
};

export default auth;
