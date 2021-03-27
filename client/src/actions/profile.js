import apiConnector from "../utils/apiConnector";
import {
    CREATE_PROFILE,
    GET_PROFILE,
    PROFILE_ERROR,
    EDIT_PROFILE,
    DELETE_EDUCATIOIN,
    DELETE_EXPERIENCE,
    DELETE_ACCOUNT,
    CLEAR_PROFILE,
    ALL_PROFILES,
} from "../costants";
import setAlert from "./alert";

const getCurrentProfile = () => async (dispatch) => {
    // console.log("inisde getCurrentProfile");
    try {
        const res = await apiConnector.get("/profile/me");
        dispatch({
            type: GET_PROFILE,
            payload: res.data,
        });
    } catch (error) {
        console.error(error.response.data);
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

const getAllProfiles = () => async (dispatch) => {
    console.log("getting all profiles");
    try {
        const res = await apiConnector.get("profile");
        dispatch({
            type: ALL_PROFILES,
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

const getProfileById = (user_id) => async (dispatch) => {
    console.log("get profile by id");
    try {
        const res = await apiConnector.get(`profile/user/${user_id}`);
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
const createProfile = (formData, history, edit) => async (dispatch) => {
    try {
        const res = await apiConnector.post(
            "profile",
            JSON.stringify(formData)
        );

        dispatch({
            type: CREATE_PROFILE,
            payload: res.data,
        });
        dispatch(
            setAlert(edit ? "Profile edited" : "Profile Updated!", "success")
        );
        history.push("/dashboard");
    } catch (error) {
        console.log(error);
        dispatch({
            type: PROFILE_ERROR,
        });
    }
};

const addExperience = (formData, history) => async (dispatch) => {
    try {
        const res = await apiConnector.put(
            "profile/experience",
            JSON.stringify(formData)
        );
        dispatch({
            type: EDIT_PROFILE,
            payload: res.data,
        });
        dispatch(setAlert("Experience Added", "success"));
        history.push("/dashboard");
    } catch (error) {
        console.log(error.response.data);
        const errors = error.response.data;
        dispatch({
            type: PROFILE_ERROR,
        });
        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
        }
    }
};

const addEducation = (formData, history) => async (dispatch) => {
    try {
        // console.log("inside action add education");

        const res = await apiConnector.put(
            "profile/education",
            JSON.stringify(formData)
        );
        dispatch({
            type: EDIT_PROFILE,
            payload: res.data,
        });
        dispatch(setAlert("Education Updated!", "success"));
        history.push("/dashboard");
    } catch (error) {
        console.log(error);
        dispatch({
            type: PROFILE_ERROR,
        });
    }
};

const deleteExperience = (exp_id) => async (dispatch) => {
    // console.log(exp_id);
    try {
        await apiConnector.delete(`profile/experience/${exp_id}`);
        dispatch({
            type: DELETE_EXPERIENCE,
        });
        dispatch(getCurrentProfile());
    } catch (error) {
        console.log(error.response.data);
        dispatch({
            type: PROFILE_ERROR,
            payload: error.response.data,
        });
    }
};

const deleteEducation = (edu_id) => async (dispatch) => {
    try {
        await apiConnector.delete(`profile/education/${edu_id}`);
        dispatch({
            type: DELETE_EDUCATIOIN,
        });
        dispatch(getCurrentProfile());
    } catch (error) {
        console.log(error.response.data);
        dispatch({
            type: PROFILE_ERROR,
            payload: error.response.data,
        });
    }
};

const deleteAccount = () => async (dispatch) => {
    console.log("deleting account");
    if (window.confirm("Are you sure to delete the account")) {
        try {
            await apiConnector.delete("profile");
            dispatch({
                type: DELETE_ACCOUNT,
            });
            dispatch({ type: CLEAR_PROFILE });
            dispatch(setAlert("Account is deleted", "danger"));
        } catch (error) {
            console.log(error.response.data);
            dispatch({
                type: PROFILE_ERROR,
                payload: error.response.data,
            });
        }
    }
};
export {
    getCurrentProfile,
    createProfile,
    addEducation,
    addExperience,
    deleteExperience,
    deleteEducation,
    deleteAccount,
    getAllProfiles,
    getProfileById,
};
