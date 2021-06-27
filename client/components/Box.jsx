import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header.jsx'
import ShoppingCartModal from './ShoppingCartModal.jsx';

class Box extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chosenBox: props.location.state.chosenBox,
      boxList:props.location.state.boxList,
      loggedIn: props.location.state.loggedIn,
      cart:props.location.state.cart,
      show: props.location.state.show,
    }
  }

  showModal = e => {
    this.setState({
      show: !this.state.show
    });
  };

  render() {

    return (
      <div>
        <Header />


            <button onClick={e => {
                  this.showModal();
            }}
              > Shopping Cart </button>
            <ShoppingCartModal show={this.state.show}>This is your shopping cart</ShoppingCartModal>


        <h2>This is in {this.state.boxList} box which is number {this.state.chosenBox}</h2>
        <div>
          <img src='https://pbs.twimg.com/profile_images/1391813117840084996/g76rVZ-5.jpg' />
          <div>
            <h1>{this.state.boxList} Snack Box</h1>
            <h4>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</h4>
            <form method="POST" action='/addToCart'>
              <input type='number'></input>
              <input type='submit'></input>
            </form>
          </div>
        </div>
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
    )
  };
}

export default Box;