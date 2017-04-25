import React from 'react';

const NytSearch = (props) => (
  <form id="NytSearch" onSubmit={props.handleSubmit}>
    <input type="text" 
    name="searchTitle"
    defaultValue={props.searchtitle}
    placeholder="search title" 
     />

    <input type="submit" value="Search" />
  </form>);

NytSearch.propTypes = {
  handleSubmit: React.PropTypes.func.isRequired
}

export default NytSearch;
