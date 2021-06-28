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
      desc: '',
      itemurls: 'https://pusheen.com/wp-content/uploads/2019/08/Business.jpg',
      items:'choose a box size to see more',
      displaySize: [['smalljbox','mediumjbox','largejbox'],['smallkbox','mediumkbox','largekbox'],['smallcbox','mediumcbox','largecbox'],['smallmbox','mediummbox','largembox']],
      price:'$39.95',
      cartItemsState:[],
      cartSubtotal: 0,
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

    let cartContents;

    const cartItems = [];
    let subTotal = 0;

    const renderCart = () => {
      for(const el in cartContents) {
        console.log(el,cartContents[el])
        if(cartContents[el] !== 0 && typeof cartContents[el] !=='string') {

          if(el[0] === 's') subTotal += 30.95
          if(el[0] === 'm') subTotal += 39.95
          if(el[0] === 'l') subTotal += 47.95

          cartItems.push(    
            <div>    
              <div className='cartItems'>
                <p>{el}:{cartContents[el]}</p>
              </div>
              <button
              onClick={() => {
                fetch('/deleteItem', {
                  method: 'PUT',
                  headers: 'application/json',
                  body: {
                    item: cartContents[el],
                    username: document.cookie.split('=')[1],
                  }
                })
              }}
              >
                delete
              </button>
            </div>
          )
        }
      }
      this.setState({cartItemsState:cartItems})
      this.setState({cartSubtotal:subTotal})
    }
  

    return (
      <div className="box-page">
        <Header />
      
          {/* shopping cart modal */}

          <i className="fas fa-shopping-bag"
          onClick={e => {
            console.log('click')
            this.showModal();
            fetch(`/getCart/:${document.cookie.split('=')[1]}`)
            .then(data => data.json())
            .then(data => {
              console.log(data)
              cartContents = data
            })
            .then(() => renderCart())
          }}
          ></i>

          <ShoppingCartModal show={this.state.show}>
            <div id='modal'>
            
            {document.cookie.split('=')[1]}'s cart
              <hr/>

              {this.state.cartItemsState}

            <hr/>

            Subtotal: ${this.state.cartSubtotal}
            <br></br>
            <Link to={'/shop/checkout'}>
              <button
                type="button"
              >
                go to checkout
              </button>
            </Link>

          </div>
        </ShoppingCartModal>




        {/* <h2>This is in {this.state.boxList} box which is number {this.state.chosenBox}</h2> */}
        <div>
          <img src={this.state.boxListurls} />
          {/* <div className="MagicScroll" data-options="mode: carousel; height: 275px;">
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
            <h2>{this.state.price}</h2>
            <p>{this.state.desc}</p>
            

            <form className='cartform' method="POST" action={`/${this.state.boxList}Box`}>
              <label>Select a size</label>
              <div className="btn-group" data-toggle="buttons">
                <label className="btn btn-primary">
                  <input type="radio" name="1" id="1" value="1"
                    onClick={() => {
                      console.log('clicked')
                      fetch(`/${this.state.displaySize[this.state.chosenBox][0]}`)
                      .then(data => data.json())
                      .then(data => this.setState({desc:data.description, items:data.itemnames, itemurls:data.imageurl, price:data.price}))
                      .then(() => console.log(`/${this.state.displaySize[this.state.chosenBox][0]}`))
                      .catch((err) => console.log(err))
                    }}
                  ></input>
                  Small
                </label>
                <label className="btn btn-primary active">
                  <input type="radio" name="2" id="2"  value="2" defaultChecked
                    onClick={() => {
                    console.log('clicked')
                    fetch(`/${this.state.displaySize[this.state.chosenBox][1]}`)
                    .then(data => data.json())
                    .then(data => this.setState({desc:data.description, items:data.itemnames, itemurls:data.imageurl, price:data.price}))
                    .then(() => console.log(`/${this.state.displaySize[this.state.chosenBox][1]}`))
                    .catch((err) => console.log(err))
                  }}
                  ></input>
                  Medium
                </label>
                <label className="btn btn-primary">
                  <input type="radio" name="3" id="3" value="3"
                    onClick={() => {
                    console.log('clicked')
                    fetch(`/${this.state.displaySize[this.state.chosenBox][2]}`)
                    .then(data => {
                      console.log(`/${this.state.displaySize[this.state.chosenBox][2]}`)
                      return data.json()})
                    .then(data => this.setState({desc:data.description, items:data.itemnames, itemurls:data.imageurl, price:data.price}))
                    .then(() => console.log(`/${this.state.displaySize[this.state.chosenBox][2]}`))
                    .catch((err) => console.log(err))
                  }}
                  ></input>
                  Large
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
              <input type="hidden" id="custId" name="username" value={document.cookie.split('=')[1]}></input>
              <input type='submit'></input>
            </form>
          </div>
        </div>
        <div className='all-items'>
          {itemImages}
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