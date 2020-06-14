import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { AddTaskForm } from './AddTaskForm'
import { RegisterForm } from './RegisterForm'
import { LoginForm } from './LoginForm'

export default function App() {
  return (
    <Router>
      <div>
        <div>
          <span>
            <Link to="/">Home</Link>
          </span>
          <span> &nbsp;
              <Link to="/tasks">Tasks</Link>
          </span>
          <span>&nbsp;
              <Link to="/register">Register</Link>
          </span>
          <span>&nbsp;
              <Link to="/login">Login</Link>
          </span>
          <span> &nbsp;
              <Link to="/logout">Logout</Link>
          </span>
          <span> &nbsp;
              <Link to="/admin">Admin panel</Link>
          </span>
          <hr/>
        </div>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/tasks">
            <Tasks />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/logout">
            <Logout />
          </Route>
          <Route path="/addtask">
            <AddTask />
          </Route>
          <Route path="/seetask">
            <SeeTask />
          </Route>
          <Route path="/admin">
            <Admin />
          </Route>
          <Route path="/becomeadmin">
            <BecomeAdmin />
          </Route>
          <Route path="/seeusers">
            <SeeUsers />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function Home() {
  let user = localStorage.getItem("isLogged");
  let greeting = "Welcome";
  if (user != undefined)
      greeting += ", " + user;
  return <h3>{greeting}</h3>;
}

function Register() {
  return <RegisterForm />
}

function Tasks() {
  let user = localStorage.getItem("isLogged");
  if (user == undefined)
    return <span>You are not logged</span>

  return (
    <div>
      <Link to="/addtask">Add task</Link> <br />
      <Link to="/seetask">See tasks</Link> <br />
    </div>
  );
}

function AddTask() {
  return <AddTaskForm />
}

function BecomeAdmin() {
  let user = localStorage.getItem("isLogged");
  if (user == undefined)
    return <span>You are not logged</span>

  let userProps = JSON.parse(localStorage.getItem(user));
  userProps.role = "admin";
  localStorage.setItem(user, JSON.stringify(userProps));
  alert("OK");
  return Admin();
}


function SeeTask() {
  let user = localStorage.getItem("isLogged");
  if (user == undefined)
    return <span>You are not logged</span>

  let userProps = JSON.parse(localStorage.getItem(user));
  let tasks = userProps.tasks;

  function onAfterSaveCell(row, cellName, cellValue) {
    userProps.tasks = tasks;
    localStorage.setItem(user, JSON.stringify(userProps));
  }

  function onBeforeSaveCell(row, cellName, cellValue) {
    // You can do any validation on here for editing value,
    // return false for reject the editing
    return true;
  }

  function onRowSelect(row, isSelected, e) {
    for (let task of tasks) {
      if (task.title == row["title"]) {
        let index = tasks.indexOf(task)
        tasks.splice(index, 1);
        userProps.tasks = tasks;
        localStorage.setItem(user, JSON.stringify(userProps));
        alert("Row deleted.")
        window.location.href = location.href;
      }
    }
  }

  const cellEditProp = {
    mode: 'click',
    blurToSave: true,
    beforeSaveCell: onBeforeSaveCell, // a hook for before saving cell
    afterSaveCell: onAfterSaveCell  // a hook for after saving cell
  };

  const selectRowProp = {
    mode: 'checkbox',
    clickToSelect: true,
    onSelect: onRowSelect
  };

  return (
    <div>
      <BootstrapTable data={tasks} striped={true} hover={true} cellEdit={cellEditProp} selectRow={selectRowProp}>
        <TableHeaderColumn dataField="title" isKey={true} dataAlign="center" dataSort={true}>Title</TableHeaderColumn>
        <TableHeaderColumn dataField="info" dataSort={true}>Description</TableHeaderColumn>
        <TableHeaderColumn dataField="hours">Hours</TableHeaderColumn>
        <TableHeaderColumn dataField="status">Status</TableHeaderColumn>
      </BootstrapTable>
      <span>Select a row for deletion or just edit whatever suits you.</span>
    </div>
  );

}

function Login() {
  return <LoginForm />
}

function Admin() {
  let user = localStorage.getItem("isLogged");
  if (user == undefined)
    return <span>You are not logged</span>

  let userProps = JSON.parse(localStorage.getItem(user));
  if (userProps.role !== "admin") {
    return (
      <div>
        <span>You are not an admin</span> <br />
        <Link to="/becomeadmin">Become admin</Link> <br />
      </div>
    );
  }
  return (
    <div>
      <Link to="/seeusers">See users</Link> <br />
    </div>
  );
}

function SeeUsers() {
  let users = [];
  for (let storageKey of Object.keys(localStorage)) {
    if (storageKey.indexOf("user-") != -1) {
      let user = {};
      user.user = storageKey;
      users.push(user);
    }
  }

  function onRowSelect(row, isSelected, e) {
    for (let user of users) {
      let currentUser = user["user"];
      if (currentUser == row["user"]) {
        localStorage.removeItem(currentUser);
        alert("Row deleted.")
        window.location.href = location.href;
      }
    }
  }

  const selectRowProp = {
    mode: 'checkbox',
    clickToSelect: true,
    onSelect: onRowSelect
  };

  return (<div>
    <BootstrapTable data={users} striped={true} hover={true} selectRow={selectRowProp}>
      <TableHeaderColumn dataField="user" isKey={true} dataAlign="center" dataSort={true}>User</TableHeaderColumn>
    </BootstrapTable>
    <span>Select a row for deletion or just edit whatever suits you.</span>
  </div>);

}

function Logout() {
  let user = localStorage.getItem("isLogged");
  if (user == undefined)
    return <span>You are not logged</span>

  localStorage.removeItem("isLogged");
  alert("OK");
  return Login();
}






