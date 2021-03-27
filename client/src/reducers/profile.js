import {
    GET_PROFILE,
    PROFILE_ERROR,
    CLEAR_PROFILE,
    CREATE_PROFILE,
    EDIT_PROFILE,
    ALL_PROFILES,
} from "../costants";
const initialState = {
    profile: null,
    profiles: [],
    loading: true,
    error: null,
    repos: [],
};

const profile = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case GET_PROFILE:
        case EDIT_PROFILE:
        case CREATE_PROFILE:
            return {
                ...state,
                profile: payload,
                loading: false,
            };
        case ALL_PROFILES:
            return {
                ...state,
                profiles: payload,
                loading: false,
            };
        case PROFILE_ERROR:
            return {
                ...state,
                profile: null,
                loading: false,
                repos: [],
                error: payload,
            };
        case CLEAR_PROFILE:
            return {
                ...state,
                profile: null,
                loading: false,
                repos: [],
            };
        default:
            return state;
    }
};

export default profile;
