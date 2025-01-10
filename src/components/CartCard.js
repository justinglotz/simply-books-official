import React from 'react';
import { PropTypes } from 'prop-types';
import { deleteCartItem } from '@/api/cartData';

export default function CartCard({ obj, onUpdate }) {
  const deleteThisCartItem = () => {
    if (window.confirm(`Remove ${obj.title} from Cart?`)) {
      deleteCartItem(obj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <div>
      <div className="card text-white bg-dark my-2">
        <div className="card-body">
          <h5 className="card-title">{obj.title}</h5>
          <p className="card-text">${obj.price}</p>
          <button type="button" onClick={deleteThisCartItem} className="btn btn-danger">
            Remove From Cart
          </button>
        </div>
      </div>
    </div>
  );
}

CartCard.propTypes = {
  obj: PropTypes.shape({
    title: PropTypes.string,
    price: PropTypes.number,
    firebaseKey: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
