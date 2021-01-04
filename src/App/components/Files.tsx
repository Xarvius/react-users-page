import React, { useState, useEffect } from 'react'
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
const fileUrl = (path: string) => {
    const url = path.split("/")
    console.log(url[1] + url[2])
    return "http://localhost:8000/" + url[1] + "/" + url[2]
}

const fileName = (path: string) => {
    return path.split("/").pop()
}

export default function FilesList(props: {id?: string}) {
    const [folderID, updateFolderID] = useState(props);
    const { loading, data, error } = useQuery(GET_FILES, {
        variables: folderID,
    });
    useEffect(() => {
        updateFolderID(props);
      }, [props]);

    if (loading || error) return (
        <div>
            "loading"
        </div>)
    return (
        <div className="file">
          {data.files.length !== 0 ?
            data?.files?.map((file: filesResponse) => (
            <p key={file.id}><FileText size={35} /> <a href={fileUrl(file.file)} target="_blank" rel="noopener noreferrer"> {fileName(file.file)} </a></p>
            ))
          : "Brak plików"}
        </div>
      );
}