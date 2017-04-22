import React, { Component } from 'react'
import {__loadArticle, __loadNytInformation} from '../lib/articleService'
import NytView from './NytView'

//this is how to get to match with a pure component style:
	// const SongView = ({ match }) => (
	//   <div>
	//     <h3>ID: {match.params.id}</h3>
	//   </div>
	// )

class ArticleView extends Component {
	constructor() {
		super();
		this.state = {
			nytData : []
		}
	}

	componentDidMount() {
		__loadArticle(this.props.match.params.id)
			.then(article => {
				__loadNytInformation(article.title, article.date, article.url)
					.then(nytData => this.setState({nytData}))
			})
	}

	render() {
		return (
		  <div className="App">
		  	<p><strong>Article ID:</strong> {this.props.match.params.id}</p>

		  	<br />
		  	<br />

		  	{this.state.nytData.map((article, index) => <NytView key={index} {...article} />)}
		  </div>
		);
	}
}

export default ArticleView;