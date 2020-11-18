import React, { useState } from 'react'
import { useQuery, gql } from '@apollo/client';
import { FileText } from 'react-bootstrap-icons'

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
const fileName = (path: string) => {
    return path.split("/").pop()
}

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
                <p key={file.id}><FileText />  {fileName(file.file)}</p>
            ))
          }
        </div>
      );
}