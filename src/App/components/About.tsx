import React, { useState } from 'react';
import { Col, Card, Row } from 'react-bootstrap'
import { useQuery, gql } from '@apollo/client';
import { Book } from 'react-bootstrap-icons'
import Publications from '../components/Publications'
import { Redirect } from "react-router-dom";

interface propsObject {
  firstName: string,
  lastName: string,
  email: string,
  phone: number,
  USOSlink: string,
  qualification: string,
  user: userID
}
interface userID {
  id: string
}
interface extrasResp {
  intro: string,
  education: string
}
const GET_EXTRAS = gql`
  query getExtras($id: ID!){
            extras(id: $id) {
              intro,
              education
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
