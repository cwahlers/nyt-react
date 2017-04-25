import React, { Component } from 'react';
import './App.css';
import ArticleForm from './components/ArticleForm';
import ArticleSearch from './components/ArticleSearch';
import Article from './components/Article';
import NytArticle from './components/NytArticle';
import {__loadArticles, __loadNytArticles, __createArticle, __destroyArticle, __updateArticle, __voteOnArticle} from './lib/articleService';

class App extends Component {
  constructor() {
    super();
    
    this.state = {
      articles : [],
      nytArticles: [{_id: 1, title: 'first', date: '2017-01-01', url: 'www.1.com'}, {id: 2, title: 'second', date: '2017-01-02', url: 'www.2.com'} ],
    }

    //when you use arrow syntax for functions, es7 will autobind those functions to the component
      //so you don't need these lines here
    //--
    this._handleSubmit = this._handleSubmit.bind(this);
    this._handleAdd = this._handleAdd.bind(this);
    this._handleRemove = this._handleRemove.bind(this);
    this._handleUpdate = this._handleUpdate.bind(this);
    this._handleVote = this._handleVote.bind(this);
    //--
  }

  componentDidMount() {
    console.log("Did mount")
    __loadArticles()
      .then(articles => this.setState({articles}))
  }

  componentDidUpdate(prevProps, prevState) {
    //clear the article form inputs if the component updates
    document.querySelector('#articleForm').children[0].value = "";
    document.querySelector('#articleForm').children[1].value = "";
    document.querySelector('#articleForm').children[2].value = "";
  }

  _handleSubmit = (evt) => {
    evt.preventDefault();

    let searchTitle = {searchTitle: evt.target.children[0].value};
    console.log('Seach for: ' + searchTitle);

    __createArticle(searchTitle)
      .then((savedArticle) => { //we do this because the savedArticle will have an _id while newArticle won't 
        let articlesUpdated = [...this.state.articles, savedArticle];

        const articles = articlesUpdated.sort(function(a, b) {
          return b.votes - a.votes;
        });

        this.setState({
          articles
        });
      })
  }

    _handleAdd = (evt) => {
    evt.preventDefault();

    let newArticle = {currentTitle: evt.target.children[0].value, currentDate: evt.target.children[1].value, currentUrl: evt.target.children[2].value };

    __createArticle(newArticle)
      .then((savedArticle) => { //we do this because the savedArticle will have an _id while newArticle won't 
        let articlesUpdated = [...this.state.articles, savedArticle];

        const articles = articlesUpdated.sort(function(a, b) {
          return b.votes - a.votes;
        });

        this.setState({
          articles
        });
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

  _handleUpdate = (evt) => {
    evt.preventDefault();
    let articleId = evt.target.getAttribute("data-articleid")
    let updatedArticle = {title: evt.target.children[0].value };

    let articlesInState = this.state.articles;

    __updateArticle(updatedArticle, articleId).then((article) => {
      //this will return a new array of : [1, 2, 99, 4, 5]
        //[1,2,3,4,5].map((a) => (a == 3) ? 99 : a);
      let articles = articlesInState.map((art) => {
        return (art._id === article._id) ? article : art
      });

      this.setState({
        articles
      })
    });
  }

  _handleVote = (evt) => {
    evt.preventDefault();

    let articleId = evt.target.getAttribute("data-articleid");
    let direction = evt.target.getAttribute("data-direction");

    let articlesInState = this.state.articles;

    __voteOnArticle(articleId, direction).then((article) => {
      //this will return a new array of : [1, 2, 99, 4, 5]
        //[1,2,3,4,5].map((a) => (a == 3) ? 99 : a);
      let articlesUpdated = articlesInState.map((art) => {
        return (art._id === article._id) ? article : art
      });

      const articles = articlesUpdated.sort(function(a, b) {
        return b.votes - a.votes;
      });

      this.setState({
        articles
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
          edit={false}
           />
        <br /><br />

        {/* Articles returned from NYT search */}
        <ul>
          {this.state.nytArticles.map((nytArticle, ind) => <NytArticle 
            key={nytArticle._id} 
            nytId={nytArticle._id} 
            title={nytArticle.title} 
            date={nytArticle.date} 
            url={nytArticle.url} 
            handleAdd={this._handleAdd} 
            />)}
        </ul>

        <h2>Saved Articles</h2>

        {/* you need to pass articleId because you don't have access to key as a prop in the Article component*/}
        <ul>
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
        </ul>

        <br /><br />
      </div>
    );
  }
}
export default App;
