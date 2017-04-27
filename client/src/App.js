import React, { Component } from 'react';
import './App.css';
//import ArticleForm from './components/ArticleForm';
import ArticleSearch from './components/ArticleSearch';
import Article from './components/Article';
import NytArticle from './components/NytArticle';
import {__loadArticles, __loadNytArticles, __createArticle, __destroyArticle, __updateArticle, __voteOnArticle} from './lib/articleService';

class App extends Component {
  constructor() {
    super();
    
    this.state = {
      articles : [],
      nytArticles: [],
      title: ""
    }

    //when you use arrow syntax for functions, es7 will autobind those functions to the component
      //so you don't need these lines here
    //--
    //this._handleAdd = this._handleAdd.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
    this._handleRemove = this._handleRemove.bind(this);
  }

  componentDidMount() {
    console.log("Did mount")
    __loadArticles()
      .then(articles => this.setState({articles}))
  }

  componentDidUpdate(prevProps, prevState) {
  }

  _handleSubmit = (evt) => {
    evt.preventDefault();
    //search the api of the NYT
    __loadNytArticles(this.state.title)
    .then((nytArticles) => {
        this.setState({
        nytArticles
      })
    })
  }

  _handleRemove = (evt) => {
    evt.preventDefault();

    let articleId = evt.target.getAttribute('data-articleid');

    __destroyArticle(articleId)
      .then((oldArticleId) => {
        
        let articles = this.state.articles.filter((article, i) => article._id !== oldArticleId)

        this.setState({
          articles
        });
      })
  }

  submitToDB = (title, date, url) => {
    //here is where you add the stuff to the mongo db
    let article = {title:title, date:date, url:url}
    __createArticle(article)
    .then((savedArticle) => {
      let articlesUpdated = [...this.state.articles, savedArticle];
      this.setState({
        articles:articlesUpdated
      })   
    });

     
  }

  render() {    
    return (
      <div className="App">
        <h1>The NYT React App</h1>

        <br /><br />

        <h2>Search for Article</h2>
        {/* you can also pass nothing to edit and it would work fine */}
        <ArticleSearch 
          handleSubmit={this._handleSubmit} 
          title={this.state.title}
          handleInputChange={event => this.setState({title: event.target.value})}
        />
        <br /><br />

        {/* Articles returned from NYT search */}
        
          {this.state.nytArticles.map((nytArticle, ind) => <NytArticle 
            key={nytArticle._id} 
            nytId={nytArticle._id} 
            title={nytArticle.title} 
            date={nytArticle.date} 
            url={nytArticle.url} 
            submitToDB={this.submitToDB} 
            />)}

        <h2>Saved Articles</h2>

        {/* you need to pass articleId because you don't have access to key as a prop in the Article component*/}
          {this.state.articles.map((article, ind) => <Article 
            key={article._id} 
            articleId={article._id} 
            title={article.title} 
            date={article.date} 
            url={article.url} 
            votes={article.votes}
            handleRemove={this._handleRemove} 
            handleUpdate={this._handleUpdate}
            handleVote={this._handleVote} 
            />)}

        <br /><br />
      </div>
    );
  }
}
export default App;
