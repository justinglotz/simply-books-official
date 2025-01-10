'use client';

import React, { useEffect, useState } from 'react';
import AuthorForm from '@/components/forms/AuthorForm';
import PropTypes from 'prop-types';
import { getSingleAuthor } from '../../../../api/authorData';

export default function EditAuthor({ params }) {
  const [editItem, setEditItem] = useState({});
  // Grab the firebasekey
  const { firebaseKey } = params;

  // Make a call to the API to get the book data
  useEffect(() => {
    getSingleAuthor(firebaseKey).then(setEditItem);
  }, [firebaseKey]);

  // Pass object to form
  return <AuthorForm obj={editItem} />;
}

EditAuthor.propTypes = {
  params: PropTypes.objectOf({}).isRequired,
};
