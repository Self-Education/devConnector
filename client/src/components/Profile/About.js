import React from "react";

const About = ({ user, skills }) => {
    return (
        <div>
            <div className="profile-about bg-light p-2">
                <h2 className="text-primary">{user.name}'s Bio</h2>
                <p>{user.bio}</p>
                <div className="line"></div>
                <h2 className="text-primary">Skill Set</h2>
                <div className="skills">
                    {skills &&
                        skills.length > 0 &&
                        skills.map((skill) => (
                            <div className="p-1">
                                <i className="fa fa-check"></i> {skill}
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
};

export default About;
