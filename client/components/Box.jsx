import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header.jsx'

const Box = props => {

console.log(props)

  return (
  <div>
    <Header />
    <h2>This is in {props.location.state.boxList} box which is number {props.location.state.chosenBox}</h2>
    <Link to={'/shop/checkout'}>
      <button
        type="button"
      >
        Checkout
      </button>
    </Link>
    <Link to={'/shop'}>
      <button
        type="button"
      >
        back
      </button>
    </Link>
  </div>
)};

export default Box;