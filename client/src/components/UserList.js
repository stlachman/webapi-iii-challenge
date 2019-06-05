import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

class UserList extends React.Component {
  constructor() {
    super();

    this.state = {
      users: "",
      error: "",
      fetchingUsers: true
    };
  }

  componentDidMount() {
    return axios
      .get(`http://localhost:4000/api/users`)
      .then(users => {
        this.setState({ users: users.data, fetchingUsers: false });
      })
      .catch(err => console.log(err));
  }

  render() {
    if (this.state.fetchingUsers) {
      return (
        <div>
          <h2>Loading List of Users</h2>
        </div>
      );
    }
    return (
      <div>
        <h2>List of Users</h2>
        {this.state.users.map(user => {
          return (
            <div key={user.id}>
              <Link to={`/users/${user.id}`}>{user.name}</Link>
            </div>
          );
        })}
      </div>
    );
  }
}

export default UserList;
