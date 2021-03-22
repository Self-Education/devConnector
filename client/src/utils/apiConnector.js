import axios from "axios";

const apiConnector = axios.create({
    baseURL: "/api",
    headers: {
        "Content-Type": "application/json",
    },
});

export default apiConnector;
