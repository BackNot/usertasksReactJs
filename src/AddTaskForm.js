import React from "react";

export class AddTaskForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { title: '', info: '', hours: '', status: '' };
        this.handleChangeTitle = this.handleChangeTitle.bind(this);
        this.handleChangeInfo = this.handleChangeInfo.bind(this);
        this.handleChangeHours = this.handleChangeHours.bind(this);
        this.handleChangeStatus = this.handleChangeStatus.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChangeTitle(event) {
        this.setState({ title: event.target.value });
    }

    handleChangeInfo(event) {
        this.setState({ info: event.target.value });
    }

    handleChangeHours(event) {
        this.setState({ hours: event.target.value });
    }

    handleChangeStatus(event) {
        this.setState({ status: event.target.value });
    }

    handleSubmit(event) {
        let title = this.state.title;
        let info = this.state.info;
        let hours = this.state.hours;
        let status = this.state.status;
        if (title == undefined || info == undefined || hours == undefined || status == undefined)
            alert("Don't leave empty fields.")
        else {
            let user = localStorage.getItem("isLogged");
            let userProps = JSON.parse(localStorage.getItem(user));

            for (let checkTask in userProps.tasks)
                if (checkTask["title"] == title)
                    return alert("Choose another title.")

            let task = {};
            task.title = title;
            task.info = info;
            task.hours = hours;
            task.status = status;
            userProps.tasks.push(task);
            alert("OK");
            localStorage.setItem(user, JSON.stringify(userProps));
            let currentTasks = localStorage.getItem("tasks");
            if (currentTasks == undefined) {
                currentTasks = [];
                currentTasks.push(task);
            }
            else {
                currentTasks.push(task);
            }
        }
        event.preventDefault();
    }

    render() {
        let username = localStorage.getItem("isLogged");
        if (username == undefined) {
            return <span>You are not logged</span>
        }
        return (
            <form onSubmit={this.handleSubmit}>
                <hr />
                <br />
                <label>
                    Title:
            </label>
                <br />
                <input type="text" value={this.state.title} onChange={this.handleChangeTitle} />
                <br />
                <label>
                    Description:
            </label>
                <br />
                <input type="text" value={this.state.info} onChange={this.handleChangeInfo} />
                <br />
                <label>
                    Hours:
            </label>
                <br />
                <input type="text" value={this.state.hours} onChange={this.handleChangeHours} />
                <br />
                <label>
                    Status:
            </label>
                <br />
                <input type="text" value={this.state.status} onChange={this.handleChangeStatus} />
                <br />
                <input type="submit" value="Save" />
            </form>
        );
    }
}