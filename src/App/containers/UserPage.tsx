import React from 'react';
import { useParams } from'react-router-dom'

interface UrlParam {
  alias: string 
}

export default function UsersList() {
    let { alias } = useParams<UrlParam>();
    return (
      <div>
        <h2>Param {alias}</h2>
      </div>
    );
  }