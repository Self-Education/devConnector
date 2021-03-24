import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
//import style sheet
import "./App.css";
// import components
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Alert from "./components/Alert";
import Dashboard from "./components/dashboard/Dashboard";
import PrivateRoute from "./components/routing/PrivateRoute";
import ProfileForm from "./components/ProfileForm/ProfileForm";
// import redux related
import { Provider } from "react-redux";
import store from "./store";
import setAuthToken from "./utils/setAuthToken";
// import actions
import { loadUser } from "./actions/auth";

// here store will be called and token is fetched before rest of DOM,
// in case the child DOM needs authentication to access.
function App() {
	// console.log("rendering --- App");
	useEffect(() => {
		// console.log("I am inside useEffect --- App");
		if (localStorage.token) {
			// console.log("Set Auth Token --- APP");
			setAuthToken(localStorage.token);
		}
		// console.log(" dispatch loadUser --- APP");
		store.dispatch(loadUser());
	}, []);
	return (
		<Provider store={store}>
			<Router>
				<Navbar />
				<Route exact path="/" component={Landing} />

				<section className="container">
					<Alert />
					<Switch>
						<Route path="/login" component={Login} />
						<Route path="/register" component={Register} />
						<PrivateRoute path="/dashboard" component={Dashboard} />
						<PrivateRoute
							path="/edit-profile"
							component={ProfileForm}
						/>
						<PrivateRoute
							path="/create-profile"
							component={ProfileForm}
						/>
					</Switch>
				</section>
			</Router>
		</Provider>
	);
}

export default App;
