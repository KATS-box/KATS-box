import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Box from './Box.jsx'

class Shop extends Component {
  constructor(props) {
    super(props);
    this.state = {
        chosenBox: 'japanese'
      }
    };

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
        <header className="pageHeader">
          <h2>Check out our unique curated asian snack boxes</h2>
          <Link to={'/box'}>
            <button
              type="button"
            >
              Japanese Box
            </button>
          </Link>
          <Link to={'/box'}>
            <button
              type="button"
            >
              Korean Box
            </button>
          </Link>
          <Link to={'/box'}>
            <button
              type="button"
            >
              Chinese Box
            </button>
          </Link>
          <Link to={'/box'}>
            <button
              type="button"
            >
              Mixed Box
            </button>
          </Link>
        </header>
      </section>
    );
  }
}

export default Shop;
