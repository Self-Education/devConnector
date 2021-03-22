import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logout } from "../../actions/auth";
const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
    const afterLogin = (
        <ul>
            <li>
                <Link onClick={logout} to="/">
                    <i className="fas fa-sign-out-alt"> </i>
                    <span className="hide-sm">logout</span>
                </Link>
            </li>
        </ul>
    );

    const beforeLogin = (
        <ul>
            <li>
                <Link to="#!">Developers</Link>
            </li>
            <li>
                <Link to="/register">Register</Link>
            </li>
            <li>
                <Link to="/login">Login</Link>
            </li>
        </ul>
    );
    return (
        <nav className="navbar bg-dark">
            <h1>
                <Link to="/">
                    <i className="fas fa-code"></i> DevConnector
                </Link>
            </h1>
            {!loading && (
                <Fragment>
                    {isAuthenticated ? afterLogin : beforeLogin}
                </Fragment>
            )}
        </nav>
    );
};

const mapStateToProps = (state) => ({
    auth: state.auth,
});

Navbar.propTypes = {
    auth: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired,
};
export default connect(mapStateToProps, { logout })(Navbar);
