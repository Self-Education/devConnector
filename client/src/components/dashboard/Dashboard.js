import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getCurrentProfile, deleteAccount } from "../../actions/profile";
import Spinner from "../layout/Spinner";
import DashboardActions from "./DashboardActions";
import ExperienceTable from "./ExperienceTable";
import EducationTable from "./EducationTable";
const Dashboard = ({
    myProfile: { profile, loading },
    getCurrentProfile,
    deleteAccount,
}) => {
    useEffect(() => {
        getCurrentProfile();
    }, [getCurrentProfile]);

    return (
        <div>
            <h1 className="large text-primary">Dashboard</h1>
            <p className="lead">
                <i className="fas fa-user"></i> Welcome{" "}
                {profile && profile.user.name}
            </p>
            {loading ? (
                <Spinner />
            ) : profile !== null ? (
                <Fragment>
                    <DashboardActions />
                    <ExperienceTable experiences={profile.experience} />
                    <EducationTable educations={profile.education} />
                </Fragment>
            ) : (
                <Fragment>
                    <p>
                        You have not yet setup a profile, please add some info
                    </p>
                    <Link to="/create-profile" className="btn btn-primary my-1">
                        Create Profile
                    </Link>
                </Fragment>
            )}
            <div className="my-2">
                <button
                    className="btn btn-danger"
                    onClick={() => deleteAccount()}
                >
                    <i className="fas fa-user-minus"></i>
                    Delete My Account
                </button>
            </div>
        </div>
    );
};

Dashboard.propTypes = {
    myProfile: PropTypes.object.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    myProfile: state.profile,
});
export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(
    Dashboard
);
