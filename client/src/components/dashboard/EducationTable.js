import React from "react";

const EducationTable = ({ educations }) => {
    return (
        <div>
            <h2 className="my-2">Education Credentials</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>School</th>
                        <th className="hide-sm">Degree</th>
                        <th className="hide-sm">Years</th>
                        <th />
                    </tr>
                </thead>
                <tbody>
                    {educations &&
                        educations.length > 0 &&
                        educations.map((edu) => (
                            <tr>
                                <td>{edu.school}</td>
                                <td className="hide-sm">{edu.degree}</td>
                                <td className="hide-sm">
                                    {edu.from}-{" "}
                                    {edu.current ? "current" : edu.to}
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

export default EducationTable;
