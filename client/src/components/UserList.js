import React from "react";
import axios from "axios";

class UserList extends React.Component {
  constructor() {
    super();

    this.state = {
      users: "",
      error: ""
    };
  }

  componentDidMount() {
    return axios
      .get(`http://localhost:4000/api/users`)
      .then(users => {
        this.setState({ users: users.data });
      })
      .catch(err => console.log(err));
  }

  render() {
    if (!this.state.users) {
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
              <p>{user.name}</p>
            </div>
          );
        })}
      </div>
    );
  }
}

export default UserList;
