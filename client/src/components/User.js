import React from "react";
import axios from "axios";

class User extends React.Component {
  constructor() {
    super();

    this.state = {
      user: "",
      error: "",
      posts: [],
      fetchingUser: true
    };
  }

  componentDidMount() {
    const id = this.props.match.params.id;
    return axios
      .get(`http://localhost:4000/api/users/${id}/posts`)
      .then(res => {
        this.setState({
          user: res.data[0].postedBy,
          posts: res.data,
          fetchingUser: false
        });
      })
      .catch(err => this.setState({ error: err.message, fetchingUser: false }));
  }

  render() {
    if (this.state.fetchingUser) {
      return (
        <div>
          <h2>Loading User Data..</h2>
        </div>
      );
    } else if (this.state.error) {
      return (
        <div>
          <h2>{this.state.error}</h2>
        </div>
      );
    }
    return (
      <div>
        <h2>Quotes from {this.state.user}</h2>
        <ul>
          {this.state.posts &&
            this.state.posts.map(post => {
              return <li key={post.id}>{post.text}</li>;
            })}
        </ul>
      </div>
    );
  }
}

export default User;
