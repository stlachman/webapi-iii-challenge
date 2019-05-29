import React from "react";
import { Route } from "react-router-dom";

import UserList from "./components/UserList";
import User from "./components/User";

function App() {
  return (
    <div>
      <Route exact path="/" component={UserList} />
      <Route exact path="/users/:id" component={User} />
    </div>
  );
}

export default App;
