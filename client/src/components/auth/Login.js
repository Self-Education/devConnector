import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { login } from "../../actions/auth";
const Login = ({ login, isAuthenticated }) => {
	const [formData, setFormDatat] = useState({ email: "", password: "" });

	const { email, password } = formData;
	const changeHandler = (e) => {
		setFormDatat({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const submitHandler = (e) => {
		e.preventDefault();
		login({ email, password });
	};

	if (isAuthenticated) {
		return <Redirect to="/dashboard" />;
	}
	return (
		<div>
			<h1 className="large text-primary">Sign In</h1>
			<p className="lead">
				<i className="fas fa-user"></i> Sign into Your Account
			</p>
			<form className="form" action="/dashboard" onSubmit={submitHandler}>
				<div className="form-group">
					<input
						type="email"
						placeholder="Email Address"
						name="email"
						value={email}
						onChange={changeHandler}
						required
					/>
				</div>
				<div className="form-group">
					<input
						type="password"
						placeholder="Password"
						name="password"
						value={password}
						onChange={changeHandler}
					/>
				</div>
				<input
					type="submit"
					className="btn btn-primary"
					value="Login"
				/>
			</form>
			<p className="my-1">
				Don't have an account? <Link to="/register">Sign Up</Link>
			</p>
		</div>
	);
};
const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
});

Login.propTypes = {
	login: PropTypes.func.isRequired,
	isAuthenticated: PropTypes.bool,
};
export default connect(mapStateToProps, { login })(Login);
