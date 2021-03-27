import React from "react";
import { Link } from "react-router-dom";

const ProfileItem = ({ profile }) => {
    const {
        skills,
        user: { name, avatar, _id },
        experience,
    } = profile;
    return (
        <div className="profile bg-light">
            <img className="round-img" src={avatar} alt="" />
            <div>
                <h2>{name}</h2>
                <p>
                    {experience && experience.length > 0
                        ? `${experience[0]["title"]} at ${experience[0]["company"]}`
                        : "NA"}
                </p>
                <p>
                    {experience && experience.length > 0
                        ? `${experience[0]["location"]} `
                        : "NA"}
                </p>
                <Link to={`/developer/${_id}`} className="btn btn-primary">
                    View Profile
                </Link>
            </div>

            {skills && skills.length > 0 && (
                <ul>
                    {skills.map((skill) => (
                        <li className="text-primary">
                            <i className="fas fa-check"></i> {skill}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ProfileItem;
