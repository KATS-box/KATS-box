import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header.jsx'
import ShoppingCartModal from './ShoppingCartModal.jsx';
import Box from './Box.jsx'

class Shop extends Component {
  constructor(props) {
    super(props);
    this.state = {
        chosenBox: 0,
        boxList:['Japanese', 'Korean', 'Chinese', 'Mixed'],
        loggedIn: false,
        cart:[],
        show: false,
      }
    };

    showModal = e => {
      this.setState({
        show: !this.state.show
      });
    };


  render() {

    return (
      <section className="mainSection">
        <Header />
        

        <i className="fas fa-shopping-bag"
          onClick={e => {
            this.showModal();
          }}/>
        
          <ShoppingCartModal show={this.state.show}>
          <div id='modal'>
            my cart ({'number of items in cart from database'})
            <hr/>

          {'IMPORT ITEM HERE'}

          <hr/>
          Subtotal: {'whatever is the total price added from database'}
          <Link to={'/shop/checkout'}>
              <button
                type="button"
              >
                go to checkout
              </button>
            </Link>
            </div>
          </ShoppingCartModal>

          
        <header className="pageHeader">
          <h2>Kaden's Asian Tasty Snacks</h2>
          <Link to={{
            pathname:'/shop/box/:japanese-box',
            state: {
              chosenBox: 0,
              boxList: this.state.boxList[0],
              show: false,
            },
            }}>
            <button
              type="button"
            >
              Japanese Box
            </button>
          </Link>
          <Link to={{
            pathname:'/shop/box/:korean-box',
            state: {
              chosenBox: 1,
              boxList: this.state.boxList[1],
              show: false,
            },
            }}>
            <button
              type="button"
            >
              Korean Box
            </button>
          </Link>
          <Link to={{
            pathname:'/shop/box/:chinese-box',
            state: {
              chosenBox: 2,
              boxList: this.state.boxList[2],
              show: false,
            },
            }}>
            <button
              type="button"
            >
              Chinese Box
            </button>
          </Link>
          <Link to={{
            pathname:'/shop/box/:mixed-box',
            state: {
              chosenBox: 3,
              boxList: this.state.boxList[3],
              show: false,
            },
            }}>
            <button
              type="button"
            >
              Mixed Box
            </button>
          </Link>
          <Link to={'/shop/checkout'}>
            <button
              type="button"
            >
              Checkout
            </button>
          </Link>
        </header>
      </section>
    );
  }
}

export default Shop;
