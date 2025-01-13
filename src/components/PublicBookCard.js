'use client';

import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTag } from '@fortawesome/free-solid-svg-icons';

function PublicBookCard({ bookObj }) {
  // CARDS TO VIEW PUBLIC BOOKS ON THE LOGIN PAGE

  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Img variant="top" src={bookObj.image} alt={bookObj.title} style={{ height: '400px' }} />
      <Card.Body>
        <Card.Title>{bookObj.title}</Card.Title>
        <p className="card-text bold">
          {bookObj.sale && (
            <span>
              <FontAwesomeIcon icon={faTag} /> SALE
              <br />
            </span>
          )}{' '}
          ${bookObj.price}
        </p>
      </Card.Body>
    </Card>
  );
}

PublicBookCard.propTypes = {
  bookObj: PropTypes.shape({
    image: PropTypes.string,
    title: PropTypes.string,
    sale: PropTypes.bool,
    price: PropTypes.string,
    firebaseKey: PropTypes.string,
  }).isRequired,
};

export default PublicBookCard;
