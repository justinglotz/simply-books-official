'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/utils/context/authContext';
import { Image } from 'react-bootstrap';
import { favoriteAuthors } from '@/api/authorData';
import Link from 'next/link';
import ListGroup from 'react-bootstrap/ListGroup';
import Loading from '@/components/Loading';

export default function Profile() {
  const { user } = useAuth();
  const [userFavoriteAuthors, setUserFavoriteAuthors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavoriteAuthors = async () => {
      const authors = await favoriteAuthors(user.uid);
      setUserFavoriteAuthors(authors);
      setLoading(false);
    };
    fetchFavoriteAuthors();
  }, [user]);

  let content;

  if (loading) {
    content = <Loading />;
  } else if (userFavoriteAuthors.length > 0) {
    content = (
      <ListGroup>
        {userFavoriteAuthors.map((author) => (
          <ListGroup.Item key={author.firebaseKey} className="bg-dark w-25 text-white">
            <Link href={`/author/${author.firebaseKey}`} passHref className="text-white text-decoration-none">
              {author.first_name} {author.last_name}
            </Link>
          </ListGroup.Item>
        ))}
      </ListGroup>
    );
  } else {
    content = <p>No favorite authors.</p>;
  }

  return (
    <>
      <Image src={user.photoURL} alt={user.photoURL} referralPolicy="no-referrer" roundedCircle />
      <h1>{user.displayName}</h1>
      <p className="card-text bold">{user.email}</p>
      <h2>Favorite Authors: </h2>
      {content}
    </>
  );
}
