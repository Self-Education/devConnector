import React from "react";

const ExperienceTable = ({ experiences }) => {
    return (
        <div>
            <h2 className="my-2">Experience Credentials</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>Company</th>
                        <th className="hide-sm">Title</th>
                        <th className="hide-sm">Years</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {experiences &&
                        experiences.length >= 0 &&
                        experiences.map((exp) => (
                            <tr>
                                <td>{exp.company}</td>
                                <td className="hide-sm">{exp.title}</td>
                                <td className="hide-sm">
                                    {exp.from} -{" "}
                                    {exp.current ? "current" : exp.to}
                                </td>
                                <td>
                                    <button className="btn btn-danger">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    );
};

export default ExperienceTable;
