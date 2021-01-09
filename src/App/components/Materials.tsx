import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import Files from '../components/Files'
import { Folder, Folder2Open } from 'react-bootstrap-icons'
import { CardColumns, Card, Row, Col } from 'react-bootstrap'

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

export default function UsersMaterials(props: {id?: string}) {
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
        <Row >
          <Col sm={8}>
            <CardColumns>
              {
                data?.folders?.map((details: foldersResponse) => (
                  <Card key={details.id} onClick={() => setToggle(details.id)} className="bg-dark text-white folderCards" >
                    <p>{toggle === details.id ? <Folder2Open size={50} /> : <Folder size={50} />} {details.name}</p>
                  </Card>
                ))
              }
            </CardColumns>
          </Col>
          <Col sm={4}>{toggle ? <Files id={toggle} />: "Lista plików"}</Col>
        </Row>
      </div>
    );
  }
