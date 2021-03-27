import apiConnector from "../utils/apiConnector";
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOG_OUT,
    CLEAR_PROFILE,
} from "../costants";
import setAlert from "./alert";
const register = ({ name, email, password }) => async (dispatch) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };
    const body = JSON.stringify({ name, email, password });
    try {
        const res = await apiConnector.post("/users", body, config);
        console.log(res);
        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data,
        });
        dispatch(loadUser());
    } catch (error) {
        const errs = error.response.data.errors;
        console.error(errs);
        errs.forEach((err) => dispatch(setAlert(err.msg, "danger")));
        dispatch({
            type: REGISTER_FAIL,
        });
    }
};

const login = ({ email, password }) => async (dispatch) => {
    // console.info("inside actions/auth/login");
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };
    const body = JSON.stringify({ email, password });
    try {
        const res = await apiConnector.post("/auth/login", body, config);
        // console.log(res.data);
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data,
        });
        dispatch(loadUser());
    } catch (error) {
        const errs = error.response.data.errors;
        console.log(error.response);
        errs.forEach((err) => dispatch(setAlert(err.msg, "danger")));
        dispatch({
            type: LOGIN_FAIL,
        });
    }
};

const loadUser = () => async (dispatch) => {
    try {
        const res = await apiConnector.get("/auth");
        dispatch({
            type: USER_LOADED,
            payload: res.data,
        });
    } catch (error) {
        console.error(error.response.data);
        dispatch({
            type: AUTH_FAIL,
        });
    }
};

const logout = () => (dispatch) => {
    console.log("inside action/auth/logout");
    dispatch({
        type: LOG_OUT,
    });
    dispatch({
        type: CLEAR_PROFILE,
    });
};

export { register, login, loadUser, logout };
