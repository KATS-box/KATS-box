import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header.jsx'
import ShoppingCartModal from './ShoppingCartModal.jsx';



class Box extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chosenBox: props.location.state.chosenBox,
      currentBox:props.location.state.boxList,
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
      boxList:['Japanese', 'Korean', 'Chinese', 'Mixed'],
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
          let size;
          let sizePrice;
          if(el[0] === 's') {
            sizePrice = 30.95
            subTotal += 30.95 * cartContents[el]
            size = 'small'
          }
          if(el[0] === 'm') {
            sizePrice = 39.95
            subTotal += 39.95 * cartContents[el]
            size = 'medium'
          }
          if(el[0] === 'l') {
            sizePrice = 47.95
            subTotal += 47.95 * cartContents[el]
            size = 'large'
          }

          const itemString = el.slice(-4)

          let box;
          if(itemString[0] === 'j') box = 0
          if(itemString[0] === 'k') box = 1
          if(itemString[0] === 'c') box = 2
          if(itemString[0] === 'm') box = 3
          console.log(this.state.boxListurls[box])

          cartItems.push(    
            <div>    
              <div className='cartItems'>
                <img src={this.state.boxListurls[box]}/>
                <p>
                  box:{this.state.boxList[box]} 
                  <br/>
                  size:{size} 
                  <br/>
                  qty: {cartContents[el]}
                  <br/>
                  price: ${(sizePrice * cartContents[el]).toFixed(2)}
                  </p>
              </div>
              {/* <button
              onClick={() => {
                fetch('/deleteItem', {
                  method: 'DELETE',
                  headers: 'application/json',
                  body: cartContents[el],
                })
              }}
              >
                delete
              </button> */}
              <i class="fas fa-trash-alt"
              onClick={() => {
                fetch('/deleteItem', {
                  method: 'DELETE',
                  headers: 'application/json',
                  body: cartContents[el],
                })
              }}
              ></i>
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
            <Link to={'/checkout'}>
              <button
                type="button"
              >
                go to checkout
              </button>
            </Link>

          </div>
        </ShoppingCartModal>


        <div className="box-top">
          <div className="box-picture">
            <img src={this.state.boxListurls} />
          </div>

          <div className="box-options">
            <h1>{this.state.boxList} Snack Box</h1>
            <h2>{this.state.price}</h2>
            <p>{this.state.desc}</p>
            

            <form className='cartform' method="POST" action={`/${this.state.currentBox}Box`}>
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
              <div className="quantity">
                <label>qty</label>
                <label>:</label>
                <select id="qty" name="qty" required>
              
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
              </div>
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