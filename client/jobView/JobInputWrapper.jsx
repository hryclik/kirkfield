import React from 'react';
import ReactDOM from 'react-dom';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

import JobForm from './JobForm.jsx';
import JobSingle from './JobSingle.jsx';


Jobs = new Mongo.Collection("jobs");

export default class JobInputWrapper extends TrackerReact(React.Component) {
	constructor() {
		super();

		this.state = {
			subscription: {
				jobs: Meteor.subscribe("allJobs")
			}
		}
	}

	componentWillUnmount() {
		this.state.subscription.jobs.stop();
	}

	jobItems() {
		return Jobs.find().fetch();
	}

	

	render() {
		
		return(
			<div>
				<h1>Add Job Details</h1>
				<JobForm />
				<ul className="resolutions">
					{this.jobItems().map( (jobItems) => {
						return <JobSingle key={jobItems._id} jobItem={jobItems} />
					})}
				</ul>
			</div>

		)
	}
}

