import React from "react";
import { Link } from "react-router-dom";
const Top = ({ profile: { user, social, company, status, location } }) => {
    const { name, avatar } = user;
    return (
        <div className="profile-top bg-primary p-2">
            <img className="round-img my-1" src={avatar} alt="" />
            <h1 className="large">{name}</h1>
            <p className="lead">
                {status} at {company}
            </p>
            <p>{location ? location : "NA"}</p>
            <div className="icons my-1">
                {social &&
                    Object.keys(social).map(
                        (key) =>
                            social[key] !== "" && (
                                <Link
                                    to={social[key]}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <i
                                        className={`fab fa-${key} fa-2x`}
                                        aria-hidden="true"
                                    ></i>
                                </Link>
                            )
                    )}
            </div>
        </div>
    );
};

export default Top;
