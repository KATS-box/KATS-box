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
      boxListurls:props.location.state.boxListurls,
      loggedIn: props.location.state.loggedIn,
      cart:props.location.state.cart,
      show: props.location.state.show,
      desc: 'description',
      itemurls: 'https://pusheen.com/wp-content/uploads/2019/08/Business.jpg',
      items:'choose a box size'
    }
  }

  showModal = e => {
    this.setState({
      show: !this.state.show
    });
  };

  render() {

    const urls = this.state.itemurls
    const items = this.state.items

    const spliturls = urls.split(',')
    const splititems = items.split(',')

    const itemImages = spliturls.map((el, i) => {
        return (
          <div className='items'>
            <p>{splititems[i]}</p>
            <img src={el}/>
          </div>
        )
    })


    return (
      <div>
        <Header />
      
          {/* shopping cart modal */}

          <i className="fas fa-shopping-bag"
          onClick={e => {
            this.showModal();
          }}
          ></i>

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




        <h2>This is in {this.state.boxList} box which is number {this.state.chosenBox}</h2>
        <div>
          <img src={this.state.boxListurls} />
          {/* <div class="MagicScroll" data-options="mode: carousel; height: 275px;">
            <img src="https://pbs.twimg.com/profile_images/1391813117840084996/g76rVZ-5.jpg" />
            <img src="https://pbs.twimg.com/profile_images/1391813117840084996/g76rVZ-5.jpg" />
            <img src="https://pbs.twimg.com/profile_images/1391813117840084996/g76rVZ-5.jpg" />
            <img src="https://pbs.twimg.com/profile_images/1391813117840084996/g76rVZ-5.jpg" />
            <img src="https://pbs.twimg.com/profile_images/1391813117840084996/g76rVZ-5.jpg" />
            <img src="https://pbs.twimg.com/profile_images/1391813117840084996/g76rVZ-5.jpg" />
            <img src="https://pbs.twimg.com/profile_images/1391813117840084996/g76rVZ-5.jpg" />
            <img src="https://pbs.twimg.com/profile_images/1391813117840084996/g76rVZ-5.jpg" />
            ...
        </div> */}
          <div>
            <h1>{this.state.boxList} Snack Box</h1>
            <h4>This is the {this.state.chosenBox}</h4>
            <p>{this.state.desc}</p>
            
            <div className='itemImages'>

              

            </div>
            {/* this was the button to fetch from the db, I couldnt get it working on the s m l form below */}
            <button
            onClick={() => {
              fetch('/shop/:smalljbox')
              .then(data => data.json())

              // .then(data => console.log(data.description))
              .then((data) => {
                console.log(data)
                this.setState({desc:data.description, items:data.itemnames, itemurls:data.imageurls})
              })
              .catch((err) => console.log(err))
            }}
            >ewhjfbhjwefb</button>


            
            <form method="POST" action='/addToCart'>

            <label>Select a size</label>
            <div className="btn-group" data-toggle="buttons">
              <label className="btn btn-primary">
                <input type="radio" name="options" id="small" 
                  onClick={() => {
                    fetch('/shop/:smalljbox')
                    .then(data => data.json())
                    .then((data) => this.setState({desc:data.imageurl}))
                    .then(() => console.log('ive been clicked small'))
                    .catch((err) => console.log(err))
                  }}
                /> Small
              </label>
              <label className="btn btn-primary active">
                <input type="radio" name="options" id="medium" defaultChecked/> Medium
              </label>
              <label className="btn btn-primary">
                <input type="radio" name="options" id="large"/> Large
              </label>
            </div>

            <label>qty :</label>
            <select id="qty" name="qty" required>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
              <input type='submit'></input>
            </form>
          </div>
        </div>
        {itemImages}
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