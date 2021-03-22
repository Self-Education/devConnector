import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducer from "./reducers/rootReducer";
import setAuthToken from "./utils/setAuthToken";
// console.log("inside store  - 1");
const initialState = {};

const middlewares = [thunk];

const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middlewares))
);
// console.log("inside store - 2");

// subscribe is called when state changes, note that store will be accessed
// before rendering component
let currentState = store.getState();
store.subscribe(() => {
    // console.log("subscribe triggerred");
    const previousState = currentState;
    currentState = store.getState();
    // if current token is different ( might be a different user), we reset
    // global axios's header with the new token, in this way, we do not need
    // to set axios's header everytime.
    if (currentState.auth.token !== previousState.auth.token) {
        setAuthToken(currentState.auth.token);
    }
});

// console.log("inside store - 3");

export default store;
