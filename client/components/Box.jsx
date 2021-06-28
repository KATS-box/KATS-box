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
      desc: 'hblfehwsbfgewsjkfgergkherbnlgjkerbnjkgbnerljkgberlkgjberkjgbejkrggbwe',
      item:[['smalljbox','mediumjbox','largejbox'],['smallkbox','mediumkbox','largekbox'],['smallcbox','mediumcbox','largecbox'],['smallmbox','mediummbox','largembox']]
    }
  }

  showModal = e => {
    this.setState({
      show: !this.state.show
    });
  };

  render() {

    const urls = 'https://pbs.twimg.com/profile_images/1391813117840084996/g76rVZ-5.jpg,https://pbs.twimg.com/profile_images/1391813117840084996/g76rVZ-5.jpg,https://pbs.twimg.com/profile_images/1391813117840084996/g76rVZ-5.jpg'
    const items = '1,2,3'

    const spliturls = urls.split(',')
    const splitItems = items.split(',')

    const itemImages = spliturls.map((el, i) => {
        return (
          <div>
            <p>{splitItems[i]}</p>
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
          {/* 
          fetch('/getCart')
          .then(data => data.json())
          .then()
          .catch(err => console.log('error getting cart',err))
          */}
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
          <img src='https://pbs.twimg.com/profile_images/1391813117840084996/g76rVZ-5.jpg' />
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
            <h4>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</h4>
            <img src={this.state.desc}></img>
            
            <div className='itemImages'>

              {itemImages}

            </div>
            {/* this was the button to fetch from the db, I couldnt get it working on the s m l form below */}
            {/* <button
            onClick={() => {
              fetch('/shop/:smalljbox')
              .then(data => data.json())

              // .then(data => console.log(data.description))
              .then((data) => this.setState({desc:data.imageurl}))
              .catch((err) => console.log(err))
            }}
            >ewhjfbhjwefb</button> */}


            
            <form method="PUT" action={`/shop/${this.state.boxList}Box`}>

            <label>Select a size</label>
            <div className="btn-group" data-toggle="buttons">
              <label className="btn btn-primary">
                <input type="radio" name="options" id="1" 
                  onClick={() => {
                    fetch('/shop/:smalljbox')
                    .then(data => data.json())
                    .then((data) => this.setState({desc:data.imageurl}))
                    .then(() => console.log('ive been clicked small'))
                    .catch((err) => console.log(err))
                  }}
                />Small
              </label>
              <label className="btn btn-primary active">
                <input type="radio" name="options" id="2" defaultChecked/>Medium
              </label>
              <label className="btn btn-primary">
                <input type="radio" name="options" id="3"/>Large
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
        <div>
          {console.log(document.getElementsByClassName('active'))}
          hello?
        </div>
      </div>
    )
  };
}

export default Box;