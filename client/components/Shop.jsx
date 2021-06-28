import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header.jsx'
import ShoppingCartModal from './ShoppingCartModal.jsx';
import Box from './Box.jsx'
// import koreanbox from './koreanbox.jpg'

class Shop extends Component {
  constructor(props) {
    super(props);
    this.state = {
        chosenBox: 0,
        boxList:['Japanese', 'Korean', 'Chinese', 'Mixed'],
        boxListurls:['https://vickyagain.files.wordpress.com/2020/10/east-asian-snacks.png?w=1024', 'https://d15kbsmiqz0zlr.cloudfront.net/wp-content/uploads/2016/05/snack-thumbnail-scaled.jpg'
        , 'https://cdn.vox-cdn.com/thumbor/vSy5uI6FBcZSN9JktwlwhyroICo=/1400x1400/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/21869467/group_shot_all.jpg', 'https://storage.googleapis.com/smstl/202122/1759/asian-snacks-market-grocery-store-st-louis-lg.jpg'],
        loggedIn: false,
        cart:[],
        show: false,
        cartItemsState:[],
        cartSubtotal: 0,
      }
    };

    showModal = e => {
      this.setState({
        show: !this.state.show
      });
    };

    

  render() {

    let cartContents;

    const cartItems = [];
    let subTotal = 0;

    const renderCart = () => {
      for(const el in cartContents) {
        console.log(el,cartContents[el])
        if(cartContents[el] !== 0 && typeof cartContents[el] !=='string') {
          let size;
          if(el[0] === 's') {
            subTotal += 30.95
            size = 'small'
          }
          if(el[0] === 'm') {
            subTotal += 39.95
            size = 'medium'
          }
          if(el[0] === 'l') {
            subTotal += 47.95
            size = 'large'
          }

          const itemString = el.slice(-4)

          let box;
          if(itemString[0] === 'j') box = 1
          if(itemString[0] === 'k') box = 2
          if(itemString[0] === 'c') box = 3
          if(itemString[0] === 'm') box = 4
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
      <section className="mainSection">
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

          
        <header className="pageHeader">
          <h2 id="subheader">Kaden's Asian Tasty Snacks</h2>
          <div className='allCards'>
          <Link to={{
            pathname:'/shop/box/:japanese-box',
            state: {
              chosenBox: 0,
              boxList: this.state.boxList[0],
              boxListurls: this.state.boxListurls[0],
              show: false,
            },
            }}>
            {/* <button
              type="button"
            >
              Japanese Box
            </button> */}
            <div className="card" style={{width:500}}>
              <img src={this.state.boxListurls[0]} className="card-img-top" alt="..."/>
              <div className="card-body">
                <p className="card-text">Japanese Box</p>
              </div>
            </div>
          </Link>
          <Link to={{
            pathname:'/shop/box/:korean-box',
            state: {
              chosenBox: 1,
              boxList: this.state.boxList[1],
              boxListurls: this.state.boxListurls[1],
              show: false,
            },
            }}>
            {/* <button
              type="button"
            >
              Korean Box
            </button> */}
            <div className="card" style={{width:500}}>
              <img src={this.state.boxListurls[1]} className="card-img-top" alt="..."/>
              <div className="card-body">
                <p className="card-text">Korean Box</p>
              </div>
            </div>
          </Link>
          <Link to={{
            pathname:'/shop/box/:chinese-box',
            state: {
              chosenBox: 2,
              boxList: this.state.boxList[2],
              boxListurls: this.state.boxListurls[2],
              show: false,
            },
            }}>
            {/* <button
              type="button"
            >
              Chinese Box
            </button> */}
            <div className="card" style={{width:500}}>
              <img src={this.state.boxListurls[2]}className="card-img-top" alt="..."/>
              <div className="card-body">
                <p className="card-text">Chinese Box</p>
              </div>
            </div>
          </Link>
          <Link to={{
            pathname:'/shop/box/:mixed-box',
            state: {
              chosenBox: 3,
              boxList: this.state.boxList[3],
              boxListurls: this.state.boxListurls[3],
              show: false,
            },
            }}>
            {/* <button
              type="button"
            >
              Mixed Box
            </button> */}
            <div className="card" style={{width:500}}>
              <img src={this.state.boxListurls[3]} className="card-img-top" alt="..."/>
              <div className="card-body">
                <p className="card-text">Mixed Box</p>
              </div>
            </div>
          </Link>
          </div>
          {/* <Link to={'/shop/checkout'}>
            <button
              type="button"
            >
              Checkout
            </button>
          </Link> */}
  
          <section>
     <div id='about'>

            <div className="left-footer">
     <div id='logo'>
 
       <h2>Social</h2>
 
       <a id='youtube' href = "https://www.youtube.com/" target = "_blank"><i className="fab fa-youtube"></i></a>
 
       <a id='insta' href = "https://www.instagram.com/" target = "_blank"><i className="fab fa-instagram"></i></a>
 
       <a id='twitter' href = "https://www.twitter.com/" target = "_blank"><i className="fab fa-twitter"></i></a>
 
       <a id='facebook' href = "https://www.facebook.com/" target = "_blank"><i className="fab fa-facebook"></i></a>
 
       <a id='pinterest' href = "https://www.pinterest.com/" target = "_blank"><i className="fab fa-pinterest"></i></a>
 
       <a id='snapchat' href = "https://www.snapchat.com/" target = "_blank"><i className="fab fa-snapchat"></i></a>
 
     </div>
 
     <div id='contact'>
       <p>KATS-box &copy; 2021,</p>
       <p>Contact Us: (555) 555-5555</p>
       <p>katsbox118@outlook.com</p>
       <p>KATS-box LLC, a Kaden Feeding Group Company.  All rights reserved.</p>
     </div>
     </div>
 
       <div id="subscribe">
         <form action="/subscribe" method ="POST">
           <input type="hidden" name="username" value={document.cookie.split('=')[1]}></input>
         <h2 id="subscribeHeader">Subscribe to Us</h2>
         <p id="subscribeWord">See The Latest On Our Instagram Feed, And Connect With Us On Facebook, Twitter & More, Subscribe to Unlock 10% Off Your First Order</p>
         <div>
        
         <input type="text" placeholder="Name" name="name" required/>
         <br></br>
         <input type="text" placeholder="Email Address" name="mail" required/>
         </div>
         <label>
           <input type="checkbox" defaultChecked="checked" name="subscribe"/> I accept the Privacy Policy and the Terms of Service
         </label>
         <div>
         <input type="submit" value="Subscribe Now"/>
         </div>
         </form>
       </div>
 
       <div id='moreInfo'>
       

       <ul className="help-column">
       
       </ul>
 
       
 
       <ul className="help-column">
       <h2 id ='explore'>Explore</h2>
         <li><a href="#">Japanese Boxes</a></li>
         <li><a href="#">Korean Boxes</a></li>
         <li><a href="#">Chinese Boxes</a></li>
         <li><a href="#">Mixed Boxes</a></li>
         <h2 id='help'>Help</h2>
         <li><a href="#">FAQS</a></li>
         <li><a href="#">Contact Us</a></li>
         <li><a href="#">Cancel your Order</a></li>
         <li><a href="#">Refund policies</a></li>
         <li><a href="#">Privacy Policy</a></li>
       </ul>
 
     </div>

     </div>

     
     
   </section>
        </header>
      </section>
    );
  }
}

export default Shop;
