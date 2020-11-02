import React from 'react';
// import Routes from './routes'
import logo from './assets/logo.svg';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import './App.css';
import { Navbar, Nav } from 'react-bootstrap'
import Home from './containers/Home'
import UsersList from './containers/UsersList'

export default function App() {
  return (
    <div className="App">
      <Router>
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="/">
            <img
              src={logo}
              width="30"
              height="30"
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
            />
          </Navbar.Brand>
            <Nav className="mr-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="users">UsersList</Nav.Link>
          </Nav>
        </Navbar>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/users">
            <UsersList />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}