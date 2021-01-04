import React from 'react'
import { useParams } from'react-router-dom'
import { useQuery, gql } from '@apollo/client'
import { Tabs, Tab, Card, Row, Col } from 'react-bootstrap'
import About from '../components/About'
import Materials from '../components/Materials'
import { Telephone, Globe, Envelope, PersonCircle } from 'react-bootstrap-icons'

interface UrlParam {
  alias: string 
}

interface queryResponse {
  firstName: string,
  lastName: string,
  email: string,
  phone: number,
  USOSlink: string,
  qualification: string,
  user: userID
}

type userID = {
  id: string
}


const GET_PROFILE = gql`
  query getProfile($alias: String!){
            profile(alias: $alias) {
                firstName,
                lastName,
                email,
                phone,
                USOSlink,
                qualification,
                user{
                  id
                }
            }
            }`;

export default function UsersList() {
    const { alias } = useParams<UrlParam>();
    const { loading, data, error } = useQuery<{profile: queryResponse}>(GET_PROFILE, {
      variables: { alias },
    });

    if (loading || error) return (
      <div>
        "loading"
      </div>)
    return (
      <div>
        <Tabs defaultActiveKey="o mnie" id="user-tab" className="bg-dark text-white" fill>
          <Tab eventKey="o mnie" title="O mnie">
            <About {...data} />
          </Tab>
          <Tab eventKey="dla studentów" title="Dla studentów">
            <Materials id={data?.profile?.user.id} />
          </Tab>
          <Tab eventKey="kontakt" title="Kontakt">
            <Card className="bg-dark text-white contact">
              <Row>
                <Col>
                <p><Telephone size={55} /> {data?.profile.phone}</p>
                <p><Envelope size={55} /> {data?.profile.email}</p>
                <p><Globe size={55} /> {data?.profile.USOSlink}</p>
                </Col>
                <PersonCircle size={300}/>
              </Row>
            </Card>
          </Tab>
        </Tabs>   
      </div>
    );
  }
