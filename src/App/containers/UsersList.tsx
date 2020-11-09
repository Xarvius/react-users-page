import React from 'react';
import { Card } from 'react-bootstrap'
import { useQuery, gql } from '@apollo/client';
import {Link, Route} from "react-router-dom";

const GET_PROFILES = gql`
  query getProfile{
    profiles{
        firstName,
        lastName,
        email,
        USOSlink,
        alias
      }
}`;

interface queryResponse {
  firstName: string,
  lastName: string,
  email: string,
  USOSlink: string,
  alias: string 
}

export default function UsersList() {
    const { loading, data } = useQuery(GET_PROFILES);
    if (loading) return (<div>
      "loading"
    </div>);
    const userList = data.profiles.map((value: queryResponse) => (
      <Link key={value.alias} to={
        {pathname: `/users/${value.alias}`}
      }>
      <Card>
        <Card.Title>{value.firstName} {value.lastName}</Card.Title>
        <Card.Subtitle>{value.email}</Card.Subtitle>
      </Card>
      </Link>
    ));

    return (
      <div>
        <Route>{userList}</Route>
      </div>
    );
  }