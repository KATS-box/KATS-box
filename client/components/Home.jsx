import React from 'react';
import { Link } from 'react-router-dom';

const Home = props => (
  <div>
    <h2>please log in here to proceed to the shop</h2>
    <Link to={'/login'}>
      <button
        type="button"
      >
      login
      </button>
    </Link>
    <Link to={'/signup'}>
      <button
        type="button"
      >
      signup
      </button>
    </Link>
    <Link to={'/shop'}>
      <button
        type="button"
      >
      go to shop
      </button>
    </Link>
  </div>
);

export default Home;