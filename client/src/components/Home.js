import React from 'react'
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom'
import ArticleView from './ArticleView'
import Name from './Name'
import Nav from './Nav'
import App from '../App'

const Home = (props) => (
<Router>
	<div>
		<Nav />
		<Route exact path="/" component={App} />
    <Route exact path="/name" component={Name} />
		<Route path="/articles/:id" component={ArticleView} />
	</div>
</Router>
)

export default Home;