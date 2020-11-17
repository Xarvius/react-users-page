import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client'
import { Col, Image, Table } from 'react-bootstrap'

interface propsObject {
  firstName: string,
  lastName: string,
  email: string,
  qualification: string,
  user: userID
}
interface userID {
  id: string
}

interface queryResponse {
  id: string,
  info: string,
}

const GET_PUBLICATIONS = gql`
  query getPublications($id: ID!){
            publications(id: $id) {
              id,
              info,
            }
  }`;

export default function UsersList(props: {profile?: propsObject}) {
    const [basicInfo] = useState(props);
    const userID = basicInfo?.profile?.user.id
    const { loading, data, error } = useQuery(GET_PUBLICATIONS, {
      variables: {id: userID},
    });
    if (loading || error) return (
      <div>
        "loading"
      </div>)
    return (
      <div>
        <Col>
            <h2>
                <Image src="" roundedCircle />
                {basicInfo.profile?.firstName} {basicInfo.profile?.lastName} 
                {basicInfo.profile?.user?.id}
            </h2>
        </Col>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Publikacje</th>
            </tr>
          </thead>
          <tbody>
            {
              data?.publications?.map((value: queryResponse) => (
                <tr key={value.id}>
                  <td>
                  {value.info}
                  </td>
                </tr>
              ))
            }
          </tbody>
        </Table>
      </div>
    );
  }