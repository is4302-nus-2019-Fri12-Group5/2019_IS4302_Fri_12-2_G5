/*
 * LoginPage
 *
 * List all the features
 */
import React from 'react';
import { Helmet } from 'react-helmet';
import './style.scss';

export default class LoginPage extends React.Component {
  // eslint-disable-line react/prefer-stateless-function

  constructor(props) {
    super(props);

    // This binding is necessary to make `this` work in the callback
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogin(e) {
    e.preventDefault();
    let username = this.refs.username.value;
    let password = this.refs.password.value;
    if (username == "abc" && password == "password") {
      // Connect and link to rest server
      console.log("Passed");
	  fetch("/hlf/api/system/ping")
	    .then(response => response.json())
        .then(responseData => {
		  console.log("Participant: " + responseData.participant);
        })
        .catch(error => {
          console.log('Error fetching and parsing data', error);
        });
    } else {
      console.log("Failed to login.");
    }
  }

  render() {
    return (
      <div className="login-page">
        <Helmet>
          <title>Login Page</title>
          <meta
            name="description"
            content="Login page of React.js Boilerplate application"
          />
        </Helmet>
        <h1>Login</h1>
        <form onSubmit={this.handleLogin}>
          Username: <input type="text" ref="username" placeholder="Username"/>
          Password: <input type="password" ref="password" placeholder="Password"/>
          <input type="submit" value="Login"/>
  		</form>
      </div>
    );
  }
}
