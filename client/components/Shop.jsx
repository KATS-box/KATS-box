import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header.jsx'

class Shop extends Component {
  constructor(props) {
    super(props);
    this.state = {
        chosenBox: 0,
        boxList:['japanese', 'korean', 'chinese', 'mixed'],
        loggedIn: false,
        cart:[],
        modalState: {
          open: false,
          type: null,
          position: { top: 0, left: 0 },
          id: null
        },
      }
      this.openModal = this.openModal.bind(this);
      this.closeModal = this.closeModal.bind(this);
    };

    openModal(type, position, id) {
      this.setState({
        modalState: {
          ...this.state.modalState,
          open: true,
          type,
          position,
          id
        }
      });
    }
  
    closeModal() {
      this.setState({
        modalState: {
          ...this.state.modalState,
          open: false
        }
      });
    }

  render() {

    // const loadBox = this.chosenBox.map(props => {
    //   return (
    //     <Box
    //     chosenBox={this.chosenBox}
    //     />
    //   );
    // });

    return (
      <section className="mainSection">
        <Header />
        <header className="pageHeader">
          <h2>Snacks for Kaden</h2>
          <h4>curated by Ivy</h4>
          <Link to={{
            pathname:'/shop/box/:japanese-box',
            state: {
              chosenBox: 0,
              boxList: this.state.boxList[0]
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
              boxList: this.state.boxList[1]
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
              boxList: this.state.boxList[2]
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
              boxList: this.state.boxList[3]
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
