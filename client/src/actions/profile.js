import apiConnector from "../utils/apiConnector";
import { CREATE_PROFILE, GET_PROFILE, PROFILE_ERROR } from "../costants";
import setAlert from "./alert";
import profile from "../reducers/profile";
const getCurrentProfile = () => async (dispatch) => {
    console.log("inisde getCurrentProfile");
    try {
        const res = await apiConnector.get("/profile/me");
        dispatch({
            type: GET_PROFILE,
            payload: res.data,
        });
    } catch (error) {
        console.error(error.response.data.msg);
        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: error.response.data.msg,
                status: error.response.status,
            },
        });
        dispatch(setAlert(error.response.data.msg, "danger"));
    }
};

const createProfile = (formData) => async (dispatch) => {
    console.log("inside createProfile");
    console.log(formData);
    try {
        const res = await apiConnector.post(
            "profile",
            JSON.stringify(formData)
        );
        dispatch({
            type: CREATE_PROFILE,
            payload: res.data,
        });
    } catch (error) {
        console.log(error);
        dispatch({
            type: PROFILE_ERROR,
        });
    }
};

export { getCurrentProfile, createProfile };
