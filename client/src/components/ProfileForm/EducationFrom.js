import React, { useState } from "react";
import { Link } from "react-router-dom";
import { addEducation } from "../../actions/profile";
import { connect } from "react-redux";

const EducationFrom = ({ addEducation, history }) => {
	const initialState = {
		school: "",
		degree: "",
		fieldofstudy: "",
		from: "",
		to: "",
		current: false,
		description: "",
	};
	const [formData, setFormData] = useState(initialState);
	const [showTo, setShowTo] = useState(true);
	const {
		school,
		degree,
		fieldofstudy,
		from,
		to,
		current,
		description,
	} = formData;

	const changeHandler = (e) => {
		const key = e.target.name;
		const value = e.target.value;
		setFormData({
			...formData,
			[key]: value,
		});
	};

	const onSubmit = (e) => {
		e.preventDefault();
		addEducation(formData, history);
	};
	return (
		<section className="container">
			<h1 className="large text-primary">Add Your Education</h1>
			<p className="lead">
				<i className="fas fa-graduation-cap"></i> Add any school,
				bootcamp, etc that you have attended
			</p>
			<small>* = required field</small>
			<form className="form" onSubmit={onSubmit}>
				<div className="form-group">
					<input
						type="text"
						placeholder="* School or Bootcamp"
						name="school"
						required
						value={school}
						onChange={changeHandler}
					/>
				</div>
				<div className="form-group">
					<input
						type="text"
						placeholder="* Degree or Certificate"
						name="degree"
						required
						value={degree}
						onChange={changeHandler}
					/>
				</div>
				<div className="form-group">
					<input
						type="text"
						placeholder="Field Of Study"
						name="fieldofstudy"
						value={fieldofstudy}
						onChange={changeHandler}
					/>
				</div>
				<div className="form-group">
					<h4>From Date</h4>
					<input
						type="date"
						name="from"
						value={from}
						onChange={changeHandler}
					/>
				</div>
				<div className="form-group">
					<p>
						<input
							type="checkbox"
							name="current"
							value={current}
							onChange={(e) => {
								setFormData({
									...formData,
									current: !current,
								});
								setShowTo(!showTo);
							}}
						/>{" "}
						Current School or Bootcamp
					</p>
				</div>
				{showTo && (
					<div className="form-group">
						<h4>To Date</h4>
						<input
							type="date"
							name="to"
							value={to}
							onChange={changeHandler}
						/>
					</div>
				)}

				<div className="form-group">
					<textarea
						name="description"
						cols="30"
						rows="5"
						placeholder="Program Description"
						value={description}
						onChange={changeHandler}
					></textarea>
				</div>
				<input type="submit" className="btn btn-primary my-1" />
				<Link className="btn btn-light my-1" to="/dashboard">
					Go Back
				</Link>
			</form>
		</section>
	);
};

// const mapStateToProps = state =>({

// })
export default connect(null, { addEducation })(EducationFrom);
