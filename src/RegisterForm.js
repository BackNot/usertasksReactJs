import React from "react";

export class RegisterForm extends React.Component {
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
        let isNameTaken = localStorage.getItem(username) != undefined;
        if (isNameTaken)
            alert("Choose another username. This is already taken.")
        else {
            let userProps = {};
            userProps.password = password;
            userProps.role = "normal";
            userProps.tasks = [];
            localStorage.setItem(username, JSON.stringify(userProps));
            alert("OK. You can login with those credentials now.")
        }
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
                <input type="submit" value="Register me" />
            </form>
        );
    }
}