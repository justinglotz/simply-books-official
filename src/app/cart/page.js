/* eslint-disable react-hooks/exhaustive-deps */

'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/utils/context/authContext';
import { getCart } from '@/api/cartData';
import CartCard from '@/components/CartCard';

function Cart() {
  // Get user ID using useAuth Hook
  const [cartItems, setCart] = useState([]);
  const { user } = useAuth();

  // create a function that makes the API call to get all the cart items
  const getCartItems = () => {
    getCart(user.uid).then(setCart);
  };

  // make the call to the API to get all the books on component render
  useEffect(() => {
    getCartItems();
  }, []);

  return (
    <div className="text-center my-4">
      <h1>{user.displayName}&apos;s Cart</h1>
      <div className="d-flex flex-wrap flex-column w-50 justify-content-center mx-auto">
        {cartItems.map((cart) => (
          <CartCard obj={cart} />
        ))}
      </div>
    </div>
  );
}

export default Cart;
