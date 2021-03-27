import { SET_ALERT, REMOVE_ALERT } from "../costants";
// console.log("inside alert reducer - 1");

const initialState = [];
// console.log("inside alert reducer - 2");

const alert = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case SET_ALERT:
            return [...state, payload];
        case REMOVE_ALERT:
            return state.filter((s) => {
                return s.id !== payload;
            });
        default:
            return state;
    }
};
// console.log("inside alert reducer - 3");

export default alert;
