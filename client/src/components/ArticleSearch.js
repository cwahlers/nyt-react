import React from 'react';

const ArticleSearch = (props) => (
  <form id="ArticleSearch" onSubmit={props.handleSubmit}>
    <input type="text" 
    name="title"
    value={props.title}
    onChange={props.handleInputChange}
    placeholder="search title" 
     />

    <input type="submit" value="Search" />
  </form>);

ArticleSearch.propTypes = {
  handleSubmit: React.PropTypes.func.isRequired
}

export default ArticleSearch;
