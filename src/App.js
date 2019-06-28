import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import querystring from 'query-string';
import './App.css';

function NonAuthenticatedIndex(props) {
  if (props.authenticated) return;

  return (
    <div>
      <h1>PlayDiff</h1>
      <h3>Compare Spotify playlists</h3>
      <p><a className="login-button" href="http://localhost:8081/login">Login</a></p>
    </div>
  );
}

function AuthenticatedIndex(props) {
  const [playlists, setPlaylists] = useState([]);
  const [fetched, setFetched] = useState(false);

  useEffect(() => {
    if (fetched) {
      const request = {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: {
          authToken: localStorage.authToken
        }
      };
      fetch('http://localhost:8081/request-playlists', request)
        .then(response => response.json)
        .then(playlists => {
          setFetched(true);
          setPlaylists(playlists);
        });
    };
  })

  if (!props.authenticated) return;

  return (
    <h1>Authenticated</h1>
  );
}

function Index(props) {
  const [authenticated, setAuthenticated] = useState(false);

  console.log(props);


  useEffect(() => {
    const params = querystring.parse(props.location.search);
    console.log(props.location.search);
    console.log(params);
    const authToken = params['access_token'];
    const refreshToken = params['refresh_token'];

    if (authToken) {
      localStorage.setItem('authToken', authToken);
      localStorage.setItem('refreshToken', refreshToken);
    }
    if (localStorage.authToken && localStorage.refreshToken) {
      setAuthenticated(true)
    }
  });

  return (
    <React.Fragment>
      <AuthenticatedIndex auth={authenticated} />
      <NonAuthenticatedIndex auth={authenticated} />
    </React.Fragment>
  )
}

function App() {
  return (
    <Router>
      <div>
        <Route path="/" exact component={Index} />
      </div>
    </Router>
  );
}

export default App;
