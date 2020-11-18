import React, { useState } from 'react'
import { useParams } from'react-router-dom'
import { useQuery, gql } from '@apollo/client';

interface filesResponse {
    id: string
    file: string
}

const GET_FILES = gql`
query getFiles($id: ID!){
            files(id: $id) {
            id
            file
            }
}`;

export default function FilesList(props: {id?: string}) {
    const [folderID] = useState(props);
    const { loading, data, error } = useQuery(GET_FILES, {
        variables: folderID,
    });
    if (loading || error) return (
        <div>
            "loading"
        </div>)
    return (
        <div>
          {
            data?.files?.map((file: filesResponse) => (
                <p key={file.id}>{file.file}</p>
            ))
          }
        </div>
      );
}