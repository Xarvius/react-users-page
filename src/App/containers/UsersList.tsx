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
    return (
      <div>
        <Route>
          {data.profiles?.map((value: queryResponse) => (
          <Card key={value.alias}>
            <Link  to={
              {pathname: `/users/${value.alias}`}
            }>
              <Card.Title>{value.firstName} {value.lastName}</Card.Title>
            </Link>
            <Card.Subtitle>{value.email}</Card.Subtitle>
          </Card>
          ))}
         </Route>
      </div>
    );
  }