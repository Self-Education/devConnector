import React from "react";
import Moment from "react-moment";
const Experience = ({ experience }) => {
    return (
        <div className="profile-exp bg-white p-2">
            <h2 className="text-primary">Experience</h2>
            {experience &&
                experience.length > 0 &&
                experience.map((exp) => (
                    <div>
                        <h3 className="text-dark">{exp.company}</h3>
                        <p>
                            <Moment format="MMM YYYY">{exp.from}</Moment> -{" "}
                            {exp.current ? (
                                "now"
                            ) : (
                                <Moment format="MMM YYYY">{exp.to}</Moment>
                            )}
                        </p>
                        <p>
                            <strong>Position: </strong>
                            {exp.title}
                        </p>
                        <p>
                            <strong>Description: </strong>
                            {exp.description}
                        </p>
                    </div>
                ))}
        </div>
    );
};

export default Experience;
