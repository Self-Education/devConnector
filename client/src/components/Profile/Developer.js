import React, { useEffect } from "react";
import Top from "./Top";
import About from "./About";
import Experience from "./Experience";
import Education from "./Education";
import Repo from "./Repo";
import { connect } from "react-redux";
import { getProfileById } from "../../actions/profile";
const Developer = ({ match, profile, getProfileById }) => {
    console.log("inside developer");
    console.log(match.params.user_id);
    useEffect(() => {
        console.log("developer useeffect");

        getProfileById(match.params.user_id);
    }, [getProfileById, match.params.user_id]);

    return (
        <section className="container">
            <a href="profiles.html" className="btn btn-light">
                Back To Profiles
            </a>
            {profile && (
                <div className="profile-grid my-1">
                    <Top profile={profile} />
                    <About user={profile.user} skills={profile.skills} />
                    <Experience experience={profile.experience} />
                    <Education education={profile.education} />
                    <Repo repos={profile.repos} />
                </div>
            )}
        </section>
    );
};
const mapStateToProps = (state) => ({
    profile: state.profile.profile,
});

export default connect(mapStateToProps, { getProfileById })(Developer);
