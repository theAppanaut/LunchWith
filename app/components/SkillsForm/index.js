import React from 'react';
import * as userService from '../../services/user-service';

var Router = require('react-router');


var SkillsList = React.createClass({

	render: function() {
		var skillEntries = this.props.entries;

		function createSkill(skill) {
			return (
				<p key={skill.key} className="panel-block" href="#">
				    {skill.text}
				    <span className="panel-icon starIcon">
				      	<i className="fa fa-star"></i>
				    </span>
				    <span className="panel-icon is-right">
				      	<i className="fa fa-trash"></i>
				    </span>

				 </p>
			);
		}

		var skillList = skillEntries.map(createSkill);

		return (
			<div>
				{skillList}
			</div>
		);
	}
});

function logElements(skillObject){
			console.log(skillObject.text);
}

var SkillsForm = React.createClass({

	getInitialState: function() {
		return {
			skills: []
		};
	},

	handleClick: function(event) {
		if (this.state.skills <= 2) {
			alert("Whoops, it looks like you haven't entered at least 3 of your top skills!")
		} else {
			Router.browserHistory.push('/activity');
		}
	},

	addSkill: function(e) {
		var skillArray = this.state.skills;

		skillArray.push(
		{
			text: this._inputElement.value,
			key: Date.now(),
			starred: false
			}
		);
		this.setState({
			skills: skillArray
		});

		skillArray.forEach(logElements);

		this._inputElement.value = "";

		e.preventDefault();
	},

  	render: function() {
    	return (
	    	<div>
				<nav className="panel" id="skillsPanel">
				  	<p className="panel-heading">
				    	Show us your skills
				  	</p>
				  	<form onSubmit={this.addSkill}>
						<p className="panel-block control has-addons">
							<input ref={(a) => this._inputElement = a} className="input is-expanded is-medium is-orange" type="text" placeholder="Ex. JavaScript" />
							<button type="submit" className="button is-medium is-orange">
								Add
							</button>
						</p>
					</form>

					<SkillsList entries={this.state.skills} />

				  	<div className="panel-block">
				    	<a to="/main" onClick={this.handleClick} className="button is-blue is-fullwidth">
				      		<p>Submit</p>
				    	</a>
				  	</div>

				</nav>
	    </div>
	    )
	}
});

export default SkillsForm;
