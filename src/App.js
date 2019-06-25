import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

function Index(props) {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    console.log(props);
    if (localStorage.authToken && localStorage.refreshToken) {
      setAuthenticated(true)
    }

    console.log('not authenticated');
  });

  return (
    <div>
      <h1>Index Page</h1>
      <a href="http://localhost:8081/login">Login</a>
      <p>Current { authenticated ? '' : 'Not '} Authenticated</p>
    </div>
  );
}

function Authorized() {
  return (
    <div>
      <h1>Authorized site</h1>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div>
        <Route path="/" exact component={Index} />
        <Route path="/logged_in" exact component={Authorized} />
      </div>
    </Router>
  );
}

export default App;
