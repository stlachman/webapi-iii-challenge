import React from "react";
import axios from "axios";

class User extends React.Component {
  constructor() {
    super();

    this.state = {
      user: "",
      error: "",
      fetchingUser: true
    };
  }

  componentDidMount() {
    const id = this.props.match.params.id;
    return axios
      .get(`http://localhost:4000/api/users/${id}`)
      .then(res => {
        this.setState({ user: res.data.name, fetchingUser: false });
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
    }
    return (
      <div>
        {this.state.user && <h2>{this.state.user}</h2>}
        {this.state.error && <h2>{this.state.error}</h2>}
      </div>
    );
  }
}

export default User;
