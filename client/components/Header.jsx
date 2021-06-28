import React from 'react';
import { Link } from 'react-router-dom';

const Header = props => (
  <header>
    <Link to={'/shop'}>
      <h1>KATS</h1>
    </Link>
  </header>
);

export default Header;