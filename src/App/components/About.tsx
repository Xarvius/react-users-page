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
const smallEducationTitle = (title: string) => {
  return title.toLowerCase() + "."
}

export default function UsersList(props: {profile?: propsObject}) {
    const [basicInfo] = useState(props);
    const { loading, data, error } = useQuery<{extras: extrasResp}>(GET_EXTRAS, {
      variables: {id: basicInfo?.profile?.user.id},
    });
    if (error) {
      return (
      <div>
        <Redirect to="/users" />
      </div>)}
    else if (loading) {
      return (
      <div>
        "loading"
      </div>)}
    return (
      <div>
        <div className="media bg-dark text-white">
          <img className="media-left"  alt="Profile" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGifDT7EaGssG2GNBWmpx-nDk73RdHHLWhWyB8BsflBPfjUqX8uGoUYVK7_woaGBClPEIaoPbmIme92qzNPGK-RB_WE6izhYE&usqp=CAU&ec=45725305" />
          <div className="media-body">
            <h2 className="card-title">
              {smallEducationTitle(basicInfo.profile!.qualification)} {basicInfo.profile?.firstName} {basicInfo.profile?.lastName}
            </h2>
            <p className="card-text">{ data?.extras?.intro }</p>
          </div>
        </div>
        <Card className="bg-dark text-white education">
        <Row>
          <Col sm={10}>
            { data?.extras?.education }
          </Col>
          <Col sm={2}>
            <Book size={85} />
            </Col>
        </Row>
        </Card>
        <Publications id={basicInfo?.profile?.user.id} />
      </div>
    );
  }
