import React from 'react';

const ArticleForm = (props) => (
  <form id="articleForm" onSubmit={props.handleSubmit} data-articleid={props.articleId}>
    <input type="text" 
    name="currentTitle"
    defaultValue={props.title}
    placeholder="insert title" 
     />

    <input type="text" 
    name="currentDate"
    defaultValue={props.date}
    placeholder="insert date" 
     />

     <input type="text" 
    name="currentUrl"
    defaultValue={props.url}
    placeholder="insert url" 
     />

    {/* inline conditional rendering: */}
    <input type="submit" value={props.edit ? "Update" : "Save" } />
  </form>);


//https://facebook.github.io/react/docs/typechecking-with-proptypes.html
ArticleForm.propTypes = {
  handleSubmit: React.PropTypes.func.isRequired,
  edit: React.PropTypes.bool.isRequired,
}

export default ArticleForm;
