import React, { useState } from "react";
import { Link } from "react-router-dom";
import { addExperience } from "../../actions/profile";
import { connect } from "react-redux";
const ExperienceForm = ({ addExperience, history }) => {
	const initialState = {
		title: "",
		company: "",
		location: "",
		from: "",
		to: "",
		current: false,
		description: "",
	};
	const [formData, setFormData] = useState(initialState);
	const [showTo, setShowTo] = useState(true);
	const {
		title,
		company,
		location,
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
		addExperience(formData, history);
	};
	return (
		<section className="container">
			<h1 className="large text-primary">Add An Experience</h1>
			<p className="lead">
				<i className="fas fa-code-branch"></i> Add any
				developer/programming positions that you have had in the past
			</p>
			<small>* = required field</small>
			<form className="form" onSubmit={onSubmit}>
				<div className="form-group">
					<input
						type="text"
						placeholder="* Job Title"
						name="title"
						required
						value={title}
						onChange={changeHandler}
					/>
				</div>
				<div className="form-group">
					<input
						type="text"
						placeholder="* Company"
						name="company"
						required
						value={company}
						onChange={changeHandler}
					/>
				</div>
				<div className="form-group">
					<input
						type="text"
						placeholder="Location"
						name="location"
						value={location}
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
							value={title}
							onChange={() => {
								setFormData((prev) => ({
									...formData,
									current: !current,
								}));
								setShowTo(!showTo);
							}}
						/>{" "}
						Current Job
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
						placeholder="Job Description"
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

export default connect(null, { addExperience })(ExperienceForm);
