import React, { Component } from 'react';
//import ArticleForm from './ArticleForm';
import NytSearch from './NytSearch';
import {
  Link
} from 'react-router-dom'

class FavoriteArticle extends Component {
  constructor(props) {
    super(props);

    this.state = {
      edit : false,
      searchTitle : "",
    }

    //when you use arrow syntax for functions, es7 will autobind those functions to the component
      //so you don't need these lines here
    //--
    this._handleEdit = this._handleEdit.bind(this);
    //--
  }

  _handleEdit = (evt) => {
    evt.preventDefault();
    this.setState({edit : !this.state.edit});
  }
 
  render() {
    //let urlToArticleView = '/articles/${this.props.articleId}';
    let displayEditForm = null;
    if (this.state.edit) {
      displayEditForm = <NytSearch 
          title={this.state.searchTitle || this.props.title}
          handleSubmit={this.props.handleUpdate}
          edit={true}
           />
    }

    return (
      <li className="favorite-article">
        { /* this.props.key */ } {/* Warning: Cat: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. */}
        
        {displayEditForm}

        &nbsp;&nbsp;&nbsp;&nbsp;
        <span className='delete-item'><a href='#' data-articleid={this.props.articleId} onClick={this.props.handleRemove}>X</a></span>
        &nbsp;&nbsp;&nbsp;&nbsp;
              
        <strong>Title:</strong> {this.props.title} {/* better to use artist from props because state in this component doesn't reflect the artist from the database in mongo */}
        &nbsp;&nbsp;
        <strong>Date:</strong> {this.props.date} {/* better to use songName from props because state in this component doesn't reflect the songName from the database in mongo */}
        &nbsp;&nbsp;&nbsp;&nbsp;
        <strong>URL:</strong> {this.props.url} {/* better to use songName from props because state in this component doesn't reflect the songName from the database in mongo */}
        &nbsp;&nbsp;&nbsp;&nbsp;
        <span className='edit-item'><a href='#' data-articleid={this.props.articleId} onClick={this._handleEdit}>{this.state.edit ? "Cancel" : "Edit"}</a></span>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <span className='vote-item'><a href='#' data-articleid={this.props.articleId} data-direction="up" onClick={this.props.handleVote}>/\</a></span>
        &nbsp;&nbsp;
        {this.props.votes}
        &nbsp;&nbsp;
        <span className='vote-item'><a href='#' data-articleid={this.props.articleId} data-direction="down" onClick={this.props.handleVote}>\/</a></span>
      </li>
    );
  }
}

FavoriteArticle.propTypes = {
  articleId: React.PropTypes.string.isRequired,
  title: React.PropTypes.string.isRequired,
  date: React.PropTypes.string,
  url: React.PropTypes.string,
}

export default FavoriteArticle;
