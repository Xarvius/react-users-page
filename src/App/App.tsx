import React from 'react';
import logo from './assets/logo.svg';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import './App.css';
import { Navbar, Nav } from 'react-bootstrap'
import { LinkContainer } from "react-router-bootstrap";
import Home from './containers/Home'
import UsersList from './containers/UsersList'
import UserPage from './containers/UserPage'
import NotFound from './containers/NotFound'

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
              <LinkContainer to="/">
                <Nav.Link>Home</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/users">
                <Nav.Link>UsersList</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/users/1">
                <Nav.Link>User</Nav.Link>
              </LinkContainer>
            </Nav>
        </Navbar>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/users" component={UsersList} />
          <Route path="/users/:alias" component={UserPage} />
          <Route path="*" component={NotFound} />
        </Switch>
      </Router>
    </div>
  );
}