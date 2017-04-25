import React from 'react';

const ArticleSearch = (props) => (
  <form id="ArticleSearch" onSubmit={props.handleSubmit}>
    <input type="text" 
    name="searchTitle"
    defaultValue={props.searchtitle}
    placeholder="search title" 
     />

    <input type="submit" value="Save" />
  </form>);

ArticleSearch.propTypes = {
  handleSubmit: React.PropTypes.func.isRequired
}

export default ArticleSearch;
