import React from 'react';
import { useParams } from'react-router-dom'
import { useQuery, gql } from '@apollo/client';

interface UrlParam {
  alias: string 
}

interface queryResponse {
  firstName: string,
  lastName: string,
  email: string,
  qualification: string,
}

const GET_PROFILE = gql`
  query getProfile($alias: String!){
            profile(alias: $alias) {
                firstName,
                lastName,
                email,
                qualification,
            }
            }`;

export default function UsersList() {
    const { alias } = useParams<UrlParam>();
    const { loading, data } = useQuery(GET_PROFILE, {
      variables: { alias },
    });
    if (loading) return (<div>
      "loading"
    </div>)
    return (
      <div>
        <h2>Param {alias}</h2>
        {data.profile.firstName}
      </div>
    );
  }