import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import Files from '../components/Files'

interface foldersResponse {
  id: string
  name: string
}
const GET_FOLDERS = gql`
  query getFolders($id: ID!){
            folders(id: $id) {
              id,
              name
            }
  }`;

export default function UsersList(props: {id?: string}) {
    const [userID] = useState(props);
    const { loading, data, error } = useQuery(GET_FOLDERS, {
      variables: userID,
    });
    if (loading || error) return (
    <div>
        "loading"
    </div>)
    return (
      <div>
        {
          data?.folders?.map((details: foldersResponse) => (
            <div key={details.id}>
              <p>
              {details.name}
              </p>
              <Files id={details.id} />
            </div>
          ))
        }
      </div>
    );
  }
