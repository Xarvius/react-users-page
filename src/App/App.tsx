import React from 'react';
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
import UserPage from './containers/UserPage'
import NotFound from './containers/NotFound'
import { useQuery, gql } from '@apollo/client';

const TEST = gql`
  query getProfile{
    profiles{
      firstName
    }
}`;

export default function App() {
  const { loading, error, data } = useQuery(TEST);
  console.log(data)
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
            <Nav.Link href="/users">UsersList</Nav.Link>
            <Nav.Link href="/users/1">User</Nav.Link>
          </Nav>
        </Navbar>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/users" component={UsersList} />
          <Route path="/users/:name" component={UserPage} />
          <Route path="*" component={NotFound} />
        </Switch>
      </Router>
    </div>
  );
}