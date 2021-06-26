import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header.jsx'

const Checkout = props => (
  <div>
    <Header />
    this is in checkout
    <Link to={'/shop'}>
      <button
        type="button"
      >
        back
      </button>
    </Link>
  </div>
);

export default Checkout;