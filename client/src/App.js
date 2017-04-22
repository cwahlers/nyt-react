import React, { Component } from 'react';
import './App.css';
import ArticleForm from './components/ArticleForm';
import Article from './components/Article';
import {__loadArticles, __createArticle, __destroyArticle, __updateArticle, __voteOnArticle} from './lib/articleService';

class App extends Component {
  constructor() {
    super();
    
    this.state = {
      songs : [],
    }

    //when you use arrow syntax for functions, es7 will autobind those functions to the component
      //so you don't need these lines here
    //--
    this._handleSubmit = this._handleSubmit.bind(this);
    this._handleRemove = this._handleRemove.bind(this);
    this._handleUpdate = this._handleUpdate.bind(this);
    this._handleVote = this._handleVote.bind(this);
    //--
  }

  componentDidMount() {
    __loadSongs()
      .then(articles => this.setState({articles}))
  }

  componentDidUpdate(prevProps, prevState) {
    //clear the song form inputs if the component updates
    document.querySelector('#articleForm').children[0].value = "";
    document.querySelector('#articleForm').children[1].value = "";
    document.querySelector('#articleForm').children[2].value = "";
  }

  _handleSubmit = (evt) => {
    evt.preventDefault();

    let newArticle = {title: evt.target.children[0].value, date: evt.target.children[1].value, url: evt.target.children[2].value, votes: 0};

    __createSong(newArticle)
      .then((savedArticle) => { //we do this because the savedSong will have an _id while newSong won't 
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

    __destroySong(articleId)
      .then((oldArticleId) => {
        
        let articles = this.state.articles.filter((article, i) => article._id !== oldArticleId)

        this.setState({
          Articles
        });
      })
  }

  _handleUpdate = (evt) => {
    evt.preventDefault();
    let articleId = evt.target.getAttribute("data-articleid")
    let updatedArticle = {title: evt.target.children[0].value };

    let songsInState = this.state.songs;

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

    let songsInState = this.state.songs;

    __voteOnSong(articleId, direction).then((article) => {
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

        <h2>Add an Article</h2>
        {/* you can also pass nothing to edit and it would work fine */}
        <ArticleForm 
          handleSubmit={this._handleSubmit} 
          edit={false}
           />
        <br /><br />

        {/* you need to pass songId because you don't have access to key as a prop in the Song component*/}
        <ul>
          {this.state.articles.map((song, ind) => <Article 
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
