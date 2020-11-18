import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client'
import { Table } from 'react-bootstrap'

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

export default function Publications(props: {id?: string}) {
    const [dataProps] = useState(props);
    const { loading, data, error } = useQuery(GET_PUBLICATIONS, {
        variables: {id: dataProps.id},
    });
    if (loading || error) return (
    <div>
        "loading"
    </div>)
    return(
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
    )
}
