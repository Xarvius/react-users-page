import React, { useState } from 'react';
import { Col, Image } from 'react-bootstrap'
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

export default function UsersList(props: {profile?: propsObject}) {
    const [basicInfo] = useState(props);
    
    return (
      <div>
        <Col>
            <h2>
                <Image src="" roundedCircle />
                {basicInfo.profile?.firstName} {basicInfo.profile?.lastName} 
            </h2>
        </Col>
        <Publications id={basicInfo?.profile?.user.id} />
      </div>
    );
  }
  