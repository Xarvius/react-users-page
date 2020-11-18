import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import Files from '../components/Files'
import { Folder, Folder2Open, FileText } from 'react-bootstrap-icons'

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
    const [toggle, setToggle] = useState("")
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
              <p onClick={() => setToggle(details.id)}>
              {toggle === details.id ? <Folder2Open /> : <Folder />} {details.name}
              </p>
              {toggle === details.id ? <p><Files id={details.id} /></p> : null}
            </div>
          ))
        }
      </div>
    );
  }
