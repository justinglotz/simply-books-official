/* eslint-disable react-hooks/exhaustive-deps */

'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { getBooks } from '../api/bookData';
import { useAuth } from '../utils/context/authContext';
import BookCard from '../components/BookCard';

function Home() {
  // Set a state for books
  const [books, setBooks] = useState([]);

  // Get user ID using useAuth Hook
  const { user } = useAuth();

  // create a function that makes the API call to get all the books
  const getAllTheBooks = () => {
    getBooks(user.uid).then(setBooks);
  };

  // make the call to the API to get all the books on component render
  useEffect(() => {
    getAllTheBooks();
  }, []);

  return (
    <div className="text-center my-4">
        <Link href="/book/new" passHref>
          <Button className="w-25">
            <FontAwesomeIcon icon={faPlus} /> Add A Book
          </Button>
        </Link>
        <div className="d-flex flex-wrap">
          {books.map((book) => (
            <BookCard key={book.firebaseKey} bookObj={book} onUpdate={getAllTheBooks} />
          ))}
        </div>
      </div>
  );
}

export default Home;
