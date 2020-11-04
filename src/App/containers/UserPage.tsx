import React from 'react';
import { useParams } from'react-router-dom'

export default function UsersList() {
    let { name } = useParams<{ name: string }>();
    return (
      <div>
        <h2>Param {name}</h2>
      </div>
    );
  }