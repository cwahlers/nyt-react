import React, { Component } from 'react';
import {
  Link
} from 'react-router-dom'

class NytArticle extends Component {
  constructor(props) {
    super(props);

    this.state = {
      //edit : false,
      // currentTitle : "",
      // currentDate : "",
      // currentUrl : ""
    }

    //when you use arrow syntax for functions, es7 will autobind those functions to the component
      //so you don't need these lines here
    //--
    this.handleAdd = this.handleAdd.bind(this);
    //--
  }

  handleAdd = (evt) => {
    this.props.submitToDB(this.props.title, this.props.date, this.props.url);
    evt.preventDefault();
    //this.setState({edit : !this.state.edit});
  }
 
  render() {
    return (
      <table className='table table-bordered'>
        { /* this.props.key */ } {/* Warning: Cat: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. */}
        <p className='delete-item'><a href='#' data-nytarticleid={this.props.nytArticleId} onClick={this.props.handleRemove}>X</a></p>
        &nbsp;&nbsp;&nbsp;&nbsp;
              
        <strong>Title:</strong> {this.props.title} 
        <strong>Date:</strong> {this.props.date} 
        &nbsp;&nbsp;&nbsp;&nbsp;
        <strong>URL:</strong> {this.props.url} 
        &nbsp;&nbsp;&nbsp;&nbsp;
        <p className='edit-item'><a href='#' 
        data-nytarticleid={this.props.nytId} onClick={this.handleAdd}>Add</a></p>
      </table>

    );
  }
}

NytArticle.propTypes = {
  nytId: React.PropTypes.string.isRequired,
  title: React.PropTypes.string.isRequired,
  date: React.PropTypes.string,
  url: React.PropTypes.string,
}

export default NytArticle;
