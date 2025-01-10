'use client';

import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { signIn } from '../utils/auth';
import { getPublicBooks } from '../api/bookData';
import PublicBookCard from './PublicBookCard';

function Signin() {
  const [books, setBooks] = useState([]);
  const getAllPublicBooks = () => {
    getPublicBooks().then(setBooks);
  };
  useEffect(() => {
    getAllPublicBooks();
  }, []);
  return (
    <>
      <div
        className="text-center d-flex flex-column justify-content-center align-content-center"
        style={{
          padding: '30px',
          maxWidth: '400px',
          margin: '0 auto',
        }}
      >
        <h1>Hi there!</h1>
        <p>Click the button below to login!</p>
        <Button type="button" size="lg" className="copy-btn" onClick={signIn}>
          Sign In
        </Button>
      </div>
      <div className="d-flex flex-wrap">
        {/* Map over public books here using BookCard component */}
        {books.map((book) => (
          <PublicBookCard key={book.firebaseKey} bookObj={book} onUpdate={getAllPublicBooks} />
        ))}
      </div>
    </>
  );
}

export default Signin;
