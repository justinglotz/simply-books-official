'use client';

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { viewAuthorDetails } from '../../../api/mergedData';

export default function ViewAuthor({ params }) {
  const [authorDetails, setAuthorDetails] = useState({});

  // grab firebaseKey from url
  const { firebaseKey } = params;

  // make call to API layer to get the data
  useEffect(() => {
    viewAuthorDetails(firebaseKey).then(setAuthorDetails);
  }, [firebaseKey]);

  return (
    <>
      <h3 className="mt-3">
        Name: {authorDetails.first_name} {authorDetails.last_name}
        {authorDetails.favorite ? ' 🤍' : ''}
      </h3>
      <h3 className="mt-3">Email: {authorDetails.email}</h3>
      <h3 className="mt-3">Books by this author:</h3>
      <div className="mt-5 d-flex flex-wrap">
        <div className="d-flex flex-row">
          {authorDetails.books?.length === 0 ? (
            <h2>This author has no books.</h2>
          ) : (
            authorDetails.books?.map((book) => (
              <div key={book.firebaseKey} className="mx-2">
                <img src={book.image} alt={book.title} style={{ width: '300px', height: '450px' }} />
                <p>{book.title}</p>
              </div>
            ))
          )}
        </div>
        {/* <div className="text-white ms-5 details">
        <h5>
          {bookDetails.title} by {bookDetails.authorObject?.first_name} {bookDetails.authorObject?.last_name}
          {bookDetails.authorObject?.favorite ? ' 🤍' : ''}
        </h5>
        Author Email: <a href={`mailto:${bookDetails.authorObject?.email}`}>{bookDetails.authorObject?.email}</a>
        <p>{bookDetails.description || ''}</p>
        <hr />
        <p>{bookDetails.sale ? `🏷️ Sale $${bookDetails.price}` : `$${bookDetails.price}`}</p>
      </div> */}
      </div>
    </>
  );
}

ViewAuthor.propTypes = {
  params: PropTypes.objectOf({}).isRequired,
};
