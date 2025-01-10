import { clientCredentials } from '../utils/client';
// API CALLS FOR CART

const endpoint = clientCredentials.databaseURL;

// GET ALL CART ITEMS FOR A SPECIFIC USER
const getCart = (uid) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/cart.json?orderBy="uid"&equalTo="${uid}"`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          resolve(Object.values(data));
        } else {
          resolve([]);
        }
      })
      .catch(reject);
  });

// DELETE CART ITEM
const deleteCartItem = (firebaseKey) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/cart/${firebaseKey}.json`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

// ADD CART ITEM
const addToCart = (payload) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/cart.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

// UPDATE CART ITEM
const updateCartItem = (payload) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/cart/${payload.firebaseKey}.json`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

export { getCart, deleteCartItem, addToCart, updateCartItem };
