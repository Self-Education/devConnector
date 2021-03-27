import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getAllProfiles } from "../../actions/profile";
import PropTypes from "prop-types";
import ProfileItem from "./ProfileItem";
const Developers = ({ profiles, getAllProfiles }) => {
    useEffect(() => {
        if (!profiles || profiles.length === 0) {
            getAllProfiles();
        }
    }, [profiles]);

    return (
        <section className="container">
            <h1 className="large text-primary">Developers</h1>
            <p className="lead">
                <i className="fab fa-connectdevelop"></i> Browse and connect
                with developers
            </p>
            <div className="profiles">
                {profiles &&
                    profiles.length > 0 &&
                    profiles.map((pro) => (
                        <ProfileItem key={pro.user._id} profile={pro} />
                    ))}
            </div>
        </section>
    );
};

Developers.prototype = {
    getAllProfiles: PropTypes.func.isRequired,
    profiles: PropTypes.array,
};

const mapStateToProps = (state) => ({
    profiles: state.profile.profiles,
});
export default connect(mapStateToProps, { getAllProfiles })(Developers);
