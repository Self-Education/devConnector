import React from "react";
import Moment from "react-moment";
import { connect } from "react-redux";
import { deleteEducation } from "../../actions/profile";
import PropTypes from "prop-types";

const EducationTable = ({ educations, deleteEducation }) => {
	console.log("education table render...");

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
							<tr key={edu._id}>
								<td>{edu.school}</td>
								<td className="hide-sm">{edu.degree}</td>
								<td className="hide-sm">
									<Moment format="YYYY/MM/DD">
										{edu.from}
									</Moment>{" "}
									-{" "}
									{edu.to == null ? (
										"current"
									) : (
										<Moment format="YYYY/MM/DD">
											{edu.to}
										</Moment>
									)}
								</td>
								<td>
									<button
										className="btn btn-danger"
										onClick={() => deleteEducation(edu._id)}
									>
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
EducationTable.propTypes = {
	education: PropTypes.array.isRequired,
	deleteEducation: PropTypes.func.isRequired,
};
export default connect(null, { deleteEducation })(EducationTable);
