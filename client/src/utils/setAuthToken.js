import apiConnector from "./apiConnector";

const setAuthToken = (token) => {
    if (token) {
        apiConnector.defaults.headers.common["x-auth-token"] = token;
        localStorage.setItem("token", token);
    } else {
        delete apiConnector.defaults.headers.common["x-auth-token"];
        localStorage.removeItem("token");
    }
};

export default setAuthToken;
