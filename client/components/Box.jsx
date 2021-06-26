import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const Box = props => (
  <div>
    <h2>This is in box</h2>
    <Link to={'/checkout'}>
      <button
        type="button"
      >
        Checkout
      </button>
    </Link>
  </div>
);

export default Box;