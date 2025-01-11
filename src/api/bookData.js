import { clientCredentials } from '../utils/client';
// API CALLS FOR BOOKS

const endpoint = clientCredentials.databaseURL;

// GET ALL BOOKS FOR A SPECIFIC USER
const getBooks = (uid) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/books.json?orderBy="uid"&equalTo="${uid}"`, {
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

// DELETE BOOK
const deleteBook = (firebaseKey) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/books/${firebaseKey}.json`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

// GET SINGLE BOOK
const getSingleBook = (firebaseKey) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/books/${firebaseKey}.json`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

// CREATE BOOK
const createBook = (payload) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/books.json`, {
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

// UPDATE BOOK
const updateBook = (payload) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/books/${payload.firebaseKey}.json`, {
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

// GET BOOKS BY AUTHOR
// Uses the firebaseKey of the author
const getBooksByAuthor = (firebaseKey) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/books.json?orderBy="author_id"&equalTo="${firebaseKey}"`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(Object.values(data)))
      .catch(reject);
  });

// GET BOOKS ON SALE
const booksOnSale = (uid) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/books.json?orderBy="uid"&equalTo="${uid}"`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const onSale = Object.values(data).filter((item) => item.sale);
        resolve(onSale);
      })
      .catch(reject);
  });

// GET FAVORITE BOOKS
const favoriteBooks = (uid) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/books.json?orderBy="uid"&equalTo="${uid}"`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const onSale = Object.values(data).filter((item) => item.favorite);
        resolve(onSale);
      })
      .catch(reject);
  });

// PUBLIC BOOKS
const getPublicBooks = () =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/books.json`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const isPublic = Object.values(data).filter((item) => item.public);
        resolve(isPublic);
      })
      .catch(reject);
  });

export { getBooks, createBook, booksOnSale, favoriteBooks, deleteBook, getSingleBook, updateBook, getBooksByAuthor, getPublicBooks };
