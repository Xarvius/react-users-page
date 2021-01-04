import React from 'react'
import { useParams } from'react-router-dom'
import { useQuery, gql } from '@apollo/client'
import { Tabs, Tab } from 'react-bootstrap'
import About from '../components/About'
import Materials from '../components/Materials'

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
          <Tab eventKey="materiały" title="Materiały">
            <Materials id={data?.profile?.user.id} />
          </Tab>
          <Tab eventKey="kontakt" title="Kontakt">
            asd3
          </Tab>
        </Tabs>   
      </div>
    );
  }
