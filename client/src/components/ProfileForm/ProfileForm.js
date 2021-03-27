import React, { Fragment, useState, useEffect } from "react";
import { createProfile, getCurrentProfile } from "../../actions/profile";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const ProfileForm = ({
    profile: { profile, loading },
    createProfile,
    getCurrentProfile,
    history,
}) => {
    const initialState = {
        company: "",
        website: "",
        location: "",
        status: "",
        skills: "",
        githubusername: "",
        bio: "",
        twitter: "",
        facebook: "",
        linkedin: "",
        youtube: "",
        instagram: "",
    };

    useEffect(() => {
        // console.log("profile from useEffect");
        if (!profile) getCurrentProfile();
        const preload = { ...initialState };
        if (!loading && profile) {
            for (const key in preload) {
                if (key in profile) {
                    preload[key] = profile[key];
                }
            }
            for (const key in profile.social) {
                if (profile.social[key]) preload[key] = profile.social[key];
            }

            if (Array.isArray(profile.skills)) {
                preload[skills] = profile.skills.join(",");
            }
            setFormData(preload);
        }
    }, [profile, getCurrentProfile]);

    const [formData, setFormData] = useState(initialState);
    const changeHandler = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const [showSocial, setShowSocial] = useState(false);

    const onSubmit = (e) => {
        e.preventDefault();
        createProfile(formData, history, profile ? true : false);
    };

    const {
        company,
        website,
        location,
        status,
        skills,
        githubusername,
        bio,
        twitter,
        facebook,
        linkedin,
        youtube,
        instagram,
    } = formData;

    return (
        <div>
            <h1 className="large text-primary">Create Your Profile</h1>
            <p className="lead">
                <i className="fas fa-user"></i> Let's get some information to
                make your profile stand out
            </p>
            <small>* = required field</small>
            <form className="form" onSubmit={onSubmit}>
                <div className="form-group">
                    <select
                        name="status"
                        value={status}
                        onChange={changeHandler}
                    >
                        <option value="0">* Select Professional Status</option>
                        <option value="Developer">Developer</option>
                        <option value="Junior Developer">
                            Junior Developer
                        </option>
                        <option value="Senior Developer">
                            Senior Developer
                        </option>
                        <option value="Manager">Manager</option>
                        <option value="Student or Learning">
                            Student or Learning
                        </option>
                        <option value="Instructor">
                            Instructor or Teacher
                        </option>
                        <option value="Intern">Intern</option>
                        <option value="Other">Other</option>
                    </select>
                    <small className="form-text">
                        Give us an idea of where you are at in your career
                    </small>
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Company"
                        name="company"
                        value={company}
                        onChange={changeHandler}
                    />
                    <small className="form-text">
                        Could be your own company or one you work for
                    </small>
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Website"
                        name="website"
                        value={website}
                        onChange={changeHandler}
                    />
                    <small className="form-text">
                        Could be your own or a company website
                    </small>
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Location"
                        name="location"
                        value={location}
                        onChange={changeHandler}
                    />
                    <small className="form-text">
                        City & state suggested (eg. Boston, MA)
                    </small>
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="* Skills"
                        name="skills"
                        value={skills}
                        onChange={changeHandler}
                    />
                    <small className="form-text">
                        Please use comma separated values (eg.
                        HTML,CSS,JavaScript,PHP)
                    </small>
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Github Username"
                        name="githubusername"
                        value={githubusername}
                        onChange={changeHandler}
                    />
                    <small className="form-text">
                        If you want your latest repos and a Github link, include
                        your username
                    </small>
                </div>
                <div className="form-group">
                    <textarea
                        placeholder="A short bio of yourself"
                        name="bio"
                        value={bio}
                        onChange={changeHandler}
                    ></textarea>
                    <small className="form-text">
                        Tell us a little about yourself
                    </small>
                </div>

                <div className="my-2">
                    <button
                        type="button"
                        className="btn btn-light"
                        onClick={() => setShowSocial(!showSocial)}
                    >
                        Add Social Network Links
                    </button>
                    <span>Optional</span>
                </div>
                {showSocial && (
                    <Fragment>
                        <div className="form-group social-input">
                            <i className="fab fa-twitter fa-2x"></i>
                            <input
                                type="text"
                                placeholder="Twitter URL"
                                name="twitter"
                                value={twitter}
                                onChange={changeHandler}
                            />
                        </div>

                        <div className="form-group social-input">
                            <i className="fab fa-facebook fa-2x"></i>
                            <input
                                type="text"
                                placeholder="Facebook URL"
                                name="facebook"
                                value={facebook}
                                onChange={changeHandler}
                            />
                        </div>

                        <div className="form-group social-input">
                            <i className="fab fa-youtube fa-2x"></i>
                            <input
                                type="text"
                                placeholder="YouTube URL"
                                name="youtube"
                                value={youtube}
                                onChange={changeHandler}
                            />
                        </div>

                        <div className="form-group social-input">
                            <i className="fab fa-linkedin fa-2x"></i>
                            <input
                                type="text"
                                placeholder="Linkedin URL"
                                name="linkedin"
                                value={linkedin}
                                onChange={changeHandler}
                            />
                        </div>

                        <div className="form-group social-input">
                            <i className="fab fa-instagram fa-2x"></i>
                            <input
                                type="text"
                                placeholder="Instagram URL"
                                name="instagram"
                                value={instagram}
                                onChange={changeHandler}
                            />
                        </div>
                    </Fragment>
                )}

                <input type="submit" className="btn btn-primary my-1" />
                <button
                    className="btn btn-light my-1"
                    onClick={() => history.goBack()}
                >
                    Go Back
                </button>
            </form>
        </div>
    );
};

ProfileForm.propTypes = {
    profile: PropTypes.object,
    createProfile: PropTypes.func.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
    profile: state.profile,
});
export default connect(mapStateToProps, { createProfile, getCurrentProfile })(
    ProfileForm
);
