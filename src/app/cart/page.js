/* eslint-disable react-hooks/exhaustive-deps */

'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/utils/context/authContext';
import { getCart } from '@/api/cartData';
import CartCard from '@/components/CartCard';
import Loading from '@/components/Loading';

function Cart() {
  const [cartItems, setCart] = useState([]);
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  // create a function that makes the API call to get all the cart items
  const getCartItems = () => {
    setIsLoading(true);
    getCart(user.uid)
      .then(setCart)
      .finally(() => setIsLoading(false));
  };

  // make the call to the API to get all the cart items on component render
  useEffect(() => {
    getCartItems();
  }, []);

  if (isLoading) {
    return <Loading />; // Show loading spinner or message
  }

  const totalPrice = cartItems.reduce((accumulator, item) => accumulator + item.price, 0);

  return (
    <div className="text-center my-4">
      <h1>{user.displayName}&apos;s Cart</h1>
      {cartItems.length > 0 ? (
        <div className="d-flex flex-wrap flex-column w-50 justify-content-center mx-auto">
          {cartItems.map((item) => (
            <CartCard key={item.firebaseKey} obj={item} onUpdate={getCartItems} />
          ))}
          <h5>Cart Total: ${totalPrice}</h5>
          <button type="button" className="btn btn-success">
            Checkout
          </button>
        </div>
      ) : (
        <p>
          Your cart is empty! <a href="/">View some books</a> to add.
        </p>
      )}
    </div>
  );
}

export default Cart;
