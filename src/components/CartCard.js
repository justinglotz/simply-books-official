import React from 'react';
import { PropTypes } from 'prop-types';

export default function CartCard({ obj }) {
  return (
    <div>
      <div className="card text-white bg-dark my-2">
        <div className="card-body">
          <h5 className="card-title">{obj.title}</h5>
          <p className="card-text">${obj.price}</p>
          <a href="/" className="btn btn-danger">
            Remove From Cart
          </a>
        </div>
      </div>
    </div>
  );
}

CartCard.propTypes = {
  obj: PropTypes.shape({
    title: PropTypes.string,
    price: PropTypes.number,
  }).isRequired,
};
