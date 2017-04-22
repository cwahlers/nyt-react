import React, { Component } from 'react'
import './NytView.css';

class NytView extends Component {
	render() {
		return (
		  <div className="NytView">
		  	<p><strong>Title:</strong> {this.props.title}</p>
		  	<p><strong>Date:</strong> {this.props.date}</p>
		  	<p><strong>URL:</strong> {this.props.url}</p>
		  </div>
		);
	}
}

export default NytView;