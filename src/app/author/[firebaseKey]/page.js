'use client';

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import PublicBookCard from '@/components/PublicBookCard';
import Loading from '@/components/Loading';
import { viewAuthorDetails } from '../../../api/mergedData';

export default function ViewAuthor({ params }) {
  const [authorDetails, setAuthorDetails] = useState({});
  const [loading, setLoading] = useState(true);

  // grab firebaseKey from url
  const { firebaseKey } = params;

  // make call to API layer to get the data
  useEffect(() => {
    viewAuthorDetails(firebaseKey)
      .then(setAuthorDetails)
      .finally(() => setLoading(false));
  }, [firebaseKey]);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <h3 className="mt-3">
        Name: {authorDetails.first_name} {authorDetails.last_name} {authorDetails.favorite && <FontAwesomeIcon icon={faHeart} className="me-2" />}
      </h3>
      <h3 className="mt-3">Email: {authorDetails.email}</h3>
      <h3 className="mt-3">Books by this author:</h3>
      <div className="mt-5 d-flex flex-wrap">
        <div className="d-flex flex-row">{authorDetails.books?.length === 0 ? <h4>This author has no books.</h4> : authorDetails.books?.map((book) => <PublicBookCard bookObj={book} />)}</div>
      </div>
    </>
  );
}

ViewAuthor.propTypes = {
  params: PropTypes.objectOf({}).isRequired,
};
