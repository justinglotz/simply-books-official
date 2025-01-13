'use client';

import React, { useEffect, useState } from 'react';
import { viewBookDetails } from '@/api/mergedData';
import PropTypes from 'prop-types';
import Loading from '@/components/Loading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTag, faHeart } from '@fortawesome/free-solid-svg-icons';

export default function ViewBook({ params }) {
  const [bookDetails, setBookDetails] = useState({});
  const [loading, setLoading] = useState(true);

  // grab firebaseKey from url
  const { firebaseKey } = params;

  // make call to API layer to get the data
  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const data = await viewBookDetails(firebaseKey);
        setBookDetails(data);
      } finally {
        setLoading(false);
      }
    };

    fetchBookDetails();
  }, [firebaseKey]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="mt-5 d-flex flex-wrap">
      <div className="d-flex flex-column">
        <img src={bookDetails.image} alt={bookDetails.title} style={{ width: '300px' }} />
      </div>
      <div className="text-white ms-5 details">
        <h5>
          {bookDetails.title} by {bookDetails.authorObject?.first_name} {bookDetails.authorObject?.last_name} {bookDetails.authorObject?.favorite && <FontAwesomeIcon icon={faHeart} />}
        </h5>
        Author Email: <a href={`mailto:${bookDetails.authorObject?.email}`}>{bookDetails.authorObject?.email}</a>
        <p>{bookDetails.description || ''}</p>
        <hr />
        <p>
          {bookDetails.sale ? (
            <>
              <FontAwesomeIcon icon={faTag} className="me-2" />
              Sale ${bookDetails.price}
            </>
          ) : (
            `$${bookDetails.price}`
          )}
        </p>
      </div>
    </div>
  );
}

ViewBook.propTypes = {
  params: PropTypes.objectOf({}).isRequired,
};
