import React from "react";
import { Home } from "./App";

export class LoginForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = { username: '', password: '' };
      this.handleChangeUsername = this.handleChangeUsername.bind(this);
      this.handleChangePassword = this.handleChangePassword.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleChangeUsername(event) {
      this.setState({ username: event.target.value });
    }
  
    handleChangePassword(event) {
      this.setState({ password: event.target.value });
    }
  
    handleSubmit(event) {
      let username = "user-" + this.state.username;
      let password = this.state.password;
      console.log(JSON.parse(localStorage.getItem(username)));
      let passwordToCheck = JSON.parse(localStorage.getItem(username)).password;
      let isPasswordOk = passwordToCheck != undefined && passwordToCheck == password;
      if (isPasswordOk) {
        alert("OK");
        localStorage.setItem("isLogged", username);
        return Home();
      }
      else
        alert("Wrong username or password");
      event.preventDefault();
    }
  
    render() {
      let username = localStorage.getItem("isLogged");
      if (username != undefined) {
        return <span>You are logged in as {username}</span>
      }
      return (
        <form onSubmit={this.handleSubmit}>
          <hr />
          <br />
          <label>
            Name:
            </label>
          <br />
          <input type="text" value={this.state.username} onChange={this.handleChangeUsername} />
          <br />
          <label>
            Password:
            </label>
          <br />
          <input type="password" value={this.state.password} onChange={this.handleChangePassword} />
          <br />
          <input type="submit" value="Login" />
        </form>
      );
    }
  }