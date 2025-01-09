'use client';

import React from 'react';
import { useAuth } from '@/utils/context/authContext';
import Card from 'react-bootstrap/Card';

export default function Profile() {
  const { user } = useAuth();
  console.log(user);
  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      {/* TODO: ADD SOME KIND OF IMAGE */}
      {/* <Card.Img variant="top" src={user.photoURL} alt={user.photoURL} /> */}
      <Card.Body>
        <Card.Title>{user.displayName}</Card.Title>
        <p className="card-text bold">{user.email}</p>
        {/* TODO: ADD FAVORITE BOOKS AND AUTHORS */}
      </Card.Body>
    </Card>
  );
}
