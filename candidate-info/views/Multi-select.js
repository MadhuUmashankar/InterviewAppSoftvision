import React from 'react';
import createClass from 'create-react-class';
import PropTypes from 'prop-types';
import Select from 'react-select';
import './react-select.scss';

const ROLES = [
	{ label: 'TA', value: 'TA' },
	{ label: 'TECH INTERVIEWER', value: 'TECH INTERVIEWER' },
	{ label: 'HR', value: 'HR' },
	{ label: 'MANAGER', value: 'MANAGER' },
	{ label: 'ADMIN', value: 'ADMIN' }
];


var MultiSelectField = createClass({
	displayName: 'MultiSelectField',
	propTypes: {
		label: PropTypes.string,
	},
	getInitialState () {
		return {
			removeSelected: true,
			disabled: false,
			crazy: false,
			stayOpen: false,
			roleValue: [],
			rtl: false,
		};
	},
	handleSelectChange (roleValue) {
		console.log('You\'ve selected:', roleValue);
		this.setState({ roleValue }, ()=> {
      this.onRoleChangeSave();
    });
	},

  onRoleChangeSave() {
    const {roleValue} = this.state;
    const {onRoleChangeSave} = this.props;
    if (!roleValue) {
        return;
    }
    onRoleChangeSave({roleValue});
  },

	toggleCheckbox (e) {
		this.setState({
			[e.target.name]: e.target.checked,
		});
	},
	toggleRtl (e) {
		let rtl = e.target.checked;
		this.setState({ rtl });
	},

	render () {
		const { crazy, disabled, stayOpen, roleValue } = this.state;
		const options =  ROLES;
		return (
			<div className="section">
				<Select
					closeOnSelect={!stayOpen}
					disabled={disabled}
					multi
					onChange={this.handleSelectChange}
					options={options}
					placeholder="Select your role(s)"
          removeSelected={this.state.removeSelected}
					rtl={this.state.rtl}
					simpleValue
					value={roleValue}
				/>

		</div>
		);
	}
});
module.exports = MultiSelectField;
