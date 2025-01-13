'use client';

import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faTrashCan, faPenToSquare, faHeart } from '@fortawesome/free-solid-svg-icons';
import Alert from 'react-bootstrap/Alert';
import { deleteAuthorBooks } from '../api/mergedData';

function AuthorCard({ authorObj, onUpdate }) {
  // FOR DELETE, WE NEED TO REMOVE THE BOOK AND HAVE THE VIEW RERENDER,
  // SO WE PASS THE FUNCTION FROM THE PARENT THAT GETS THE BOOKS
  const deleteThisAuthor = () => {
    if (window.confirm(`Delete ${authorObj.first_name} ${authorObj.last_name}?`)) {
      deleteAuthorBooks(authorObj.firebaseKey).then(() => onUpdate());
      // deleteSingleAuthor(authorObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <Card className="border-0" style={{ width: '18rem', margin: '10px' }}>
      <Card.Body className="p-0 d-flex flex-column">
        <div className="p-3 flex-grow-1">
          <Card.Title>
            {authorObj.first_name} {authorObj.last_name}
          </Card.Title>
          <p>{authorObj.email}</p>
          <p className="card-text bold">
            {authorObj.favorite && (
              <Alert variant="danger" className="fw-bold p-1 d-inline-block">
                <FontAwesomeIcon icon={faHeart} /> FAVORITE
                <br />
              </Alert>
            )}{' '}
          </p>
          {/* DYNAMIC LINK TO VIEW THE AUTHOR DETAILS  */}
        </div>
        <div className="d-flex flex-row">
          <Col className="col-4 p-0">
            <Link href={`/author/${authorObj.firebaseKey}`} passHref>
              <Button className="w-100" variant="primary" style={{ borderRadius: '0 0 0 6px' }}>
                <FontAwesomeIcon icon={faEye} /> <br />
                VIEW
              </Button>
            </Link>
          </Col>
          <Col className="col-4 p-0">
            {/* DYNAMIC LINK TO EDIT THE AUTHOR DETAILS  */}
            <Link href={`/author/edit/${authorObj.firebaseKey}`} passHref>
              <Button className="w-100 rounded-0" variant="info">
                <FontAwesomeIcon icon={faPenToSquare} /> <br />
                EDIT
              </Button>
            </Link>
          </Col>
          <Col className="col-4 p-0">
            <Button className="w-100" variant="danger" onClick={deleteThisAuthor} style={{ borderRadius: '0 0 6px 0' }}>
              <FontAwesomeIcon icon={faTrashCan} /> DELETE
            </Button>
          </Col>
        </div>
      </Card.Body>
    </Card>
  );
}

AuthorCard.propTypes = {
  authorObj: PropTypes.shape({
    email: PropTypes.string,
    favorite: PropTypes.bool,
    firebaseKey: PropTypes.string,
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    uid: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default AuthorCard;
