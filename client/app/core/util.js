import React from 'react';

class AutoBindComponent extends React.Component {
	constructor(...args){
		super(...args);

		debugger;
	}
}

React.AutoBindComponent = AutoBindComponent;

export default React