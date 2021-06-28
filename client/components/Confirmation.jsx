import React from 'react';
import { Link } from 'react-router-dom';

const Confirmation = props => (
  <header>
    <h2>Thank you for your order</h2>
    <p>
        Order confirmation

        Thank you for your order!

        We've received your order and sent you a confirmation email.
    </p>
    <Link to={'/shop'}>
      <button
        type="button"
      >
        Take me back to the shop
      </button>
    </Link>
  </header>
);

export default Confirmation;