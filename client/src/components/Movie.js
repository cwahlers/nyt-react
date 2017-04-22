import React, { Component } from 'react'

class Movie extends Component {

  constructor(props) {
    super(props);
    this.state={
      movie: {}
    }
  }
  componentDidMount() {
    //update the movie in state here
    //fetch

     fetch(`/movies/${this.props.match.params.movie}`)
    .then(res => res.json())
    .then(movie =>{this.setState({movie})}
    );
  }

  render() {

    return (
      <div>
          Movie ID: {this.props.match.params.movie}
          <br></br>
          {this.state.movie.Title}
          <br></br>
          {this.state.movie.Year}
      </div>
    );
  }
}

export default Movie;