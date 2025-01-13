'use client';

import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { useAuth } from '@/utils/context/authContext';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faEye, faTrashCan, faPenToSquare, faTag } from '@fortawesome/free-solid-svg-icons';
import Alert from 'react-bootstrap/Alert';
import { deleteBook } from '../api/bookData';
import { addToCart, deleteCartItem, getCart, updateCartItem } from '../api/cartData';

function BookCard({ bookObj, onUpdate }) {
  const { user } = useAuth();
  // FOR DELETE, WE NEED TO REMOVE THE BOOK AND HAVE THE VIEW RERENDER,
  // SO WE PASS THE FUNCTION FROM THE PARENT THAT GETS THE BOOKS

  const deleteThisBook = () => {
    if (window.confirm(`Delete ${bookObj.title}?`)) {
      // Delete books from carts before deleting the book
      getCart(user.uid)
        .then((cartItems) => cartItems.filter((cartItem) => cartItem.bookFirebaseKey === bookObj.firebaseKey))
        .then((matchedItems) => matchedItems.forEach((item) => deleteCartItem(item.firebaseKey)))
        .then(deleteBook(bookObj.firebaseKey).then(() => onUpdate()));
    }
  };

  const handleAddToCart = () => {
    addToCart(bookObj).then(({ name }) => {
      const patchPayload = {
        firebaseKey: name,
        bookFirebaseKey: bookObj.firebaseKey,
      };
      updateCartItem(patchPayload);
    });
  };

  return (
    <Card className="border-0" style={{ width: '18rem', margin: '10px' }}>
      <Card.Img variant="top" src={bookObj.image} alt={bookObj.title} style={{ height: '400px' }} />
      <Card.Body className="p-0 d-flex flex-column">
        <div className="p-3 flex-grow-1">
          <Card.Title>{bookObj.title}</Card.Title>
          <p className="card-text bold m-2">
            ${bookObj.price.toFixed(2)} <br />
            {bookObj.sale && (
              <Alert variant="info" className="fw-bold p-1 d-inline-block">
                <FontAwesomeIcon icon={faTag} /> SALE
                <br />
              </Alert>
            )}{' '}
          </p>
        </div>
        <div className="d-flex flex-column">
          <Row className="justify-content-between g-0 mx-0">
            {/* DYNAMIC LINK TO VIEW THE BOOK DETAILS  */}
            <Col className="col-4 p-0">
              <Link href={`/book/${bookObj.firebaseKey}`} passHref>
                <Button className="w-100 rounded-0" variant="primary">
                  <FontAwesomeIcon icon={faEye} /> <br />
                  VIEW
                </Button>
              </Link>
            </Col>
            {/* DYNAMIC LINK TO EDIT THE BOOK DETAILS  */}
            <Col className="col-4 p-0">
              <Link href={`/book/edit/${bookObj.firebaseKey}`} passHref>
                <Button className="w-100 rounded-0" variant="info">
                  <FontAwesomeIcon icon={faPenToSquare} /> <br />
                  EDIT
                </Button>
              </Link>
            </Col>
            <Col className="col-4 p-0">
              <Button className="w-100 rounded-0" variant="danger" onClick={deleteThisBook}>
                <FontAwesomeIcon icon={faTrashCan} /> DELETE
              </Button>
            </Col>
          </Row>
          <Button className="btn btn-success w-100 rounded-top-0" onClick={handleAddToCart}>
            <FontAwesomeIcon icon={faCartShopping} /> ADD TO CART
          </Button>
        </div>
        {/* </Container> */}
      </Card.Body>
    </Card>
  );
}

BookCard.propTypes = {
  bookObj: PropTypes.shape({
    image: PropTypes.string,
    title: PropTypes.string,
    sale: PropTypes.bool,
    price: PropTypes.string,
    firebaseKey: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default BookCard;
