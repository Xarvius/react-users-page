import React, { useState } from 'react';
import { Col, Image, Card } from 'react-bootstrap'
import { useQuery, gql } from '@apollo/client';
import Publications from '../components/Publications'

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
interface extrasResp {
  intro: string
}
const GET_EXTRAS = gql`
  query getExtras($id: ID!){
            extras(id: $id) {
              intro
            }
  }`;



export default function UsersList(props: {profile?: propsObject}) {
    const [basicInfo] = useState(props);
    const { loading, data, error } = useQuery<{extras: extrasResp}>(GET_EXTRAS, {
      variables: {id: basicInfo?.profile?.user.id},
    });

    if (loading || error) return (
    <div>
        "loading"
    </div>)
    return (
      <div>
        <Col>
        <Card className="bg-dark text-white">
            <h2>
                <Image src="" roundedCircle />
                {basicInfo.profile?.firstName} {basicInfo.profile?.lastName} 
            </h2>
            <p>{ data?.extras?.intro }</p>
        </Card>
        </Col>
        
        <Publications id={basicInfo?.profile?.user.id} />
      </div>
    );
  }
