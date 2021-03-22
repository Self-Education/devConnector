import { SET_ALERT, REMOVE_ALERT } from "../costants";
import { v4 as uuidv4 } from "uuid";

const setAlert = (msg, alertType) => (dispatch) => {
    console.log("insdie actions/alert/setAlert");
    const id = uuidv4();
    dispatch({
        type: SET_ALERT,
        payload: { msg, alertType, id },
    });
    setTimeout(() => {
        dispatch({
            type: REMOVE_ALERT,
            payload: id,
        });
        console.log("removed alert");
    }, 2000);
};

export default setAlert;
