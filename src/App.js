import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

function Index() {
  const login = () => {
    fetch('http://localhost:8081/login')
  }

  return (
    <div>
      <h1>Index Page</h1>
      <button onClick={login}>Login</button>
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
        <Route path="/auth" exact component={Authorized} />
      </div>
    </Router>
  );
}

export default App;
