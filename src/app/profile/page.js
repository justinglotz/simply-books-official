'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/utils/context/authContext';
import { Image } from 'react-bootstrap';
import { favoriteAuthors } from '@/api/authorData';
import Link from 'next/link';

export default function Profile() {
  const { user } = useAuth();
  const [userFavoriteAuthors, setUserFavoriteAuthors] = useState([]);

  useEffect(() => {
    const fetchFavoriteAuthors = async () => {
      const authors = await favoriteAuthors(user.uid);
      setUserFavoriteAuthors(authors);
    };
    fetchFavoriteAuthors();
  }, [user]);
  console.log(user);
  return (
    <>
      <Image src={user.photoURL} referralPolicy="no-referrer" roundedCircle />
      {/* TODO: ADD SOME KIND OF IMAGE */}
      {/* <Card.Img variant="top" src={user.photoURL} alt={user.photoURL} /> */}
      <h1>{user.displayName}</h1>
      <p className="card-text bold">{user.email}</p>
      {/* Favorite Authors */}
      <h2>Favorite Authors: </h2>
      {userFavoriteAuthors.length > 0 ? (
        userFavoriteAuthors.map((author) => (
          <Link href={`/author/${author.firebaseKey}`} passHref>
            {' '}
            <h6>
              {author.first_name} {author.last_name}
            </h6>{' '}
          </Link>
        ))
      ) : (
        <p>No favorite authors.</p>
      )}
    </>
  );
}
