import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import Header from './Header.jsx'



class Checkout extends Component {
  constructor(props) {
    super(props);
    this.state = {  
      cartItemsState:[],
      cartSubtotal: 0,
      boxListurls:['https://vickyagain.files.wordpress.com/2020/10/east-asian-snacks.png?w=1024', 'https://d15kbsmiqz0zlr.cloudfront.net/wp-content/uploads/2016/05/snack-thumbnail-scaled.jpg'
        , 'https://cdn.vox-cdn.com/thumbor/vSy5uI6FBcZSN9JktwlwhyroICo=/1400x1400/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/21869467/group_shot_all.jpg', 'https://storage.googleapis.com/smstl/202122/1759/asian-snacks-market-grocery-store-st-louis-lg.jpg'],
        boxList:['Japanese', 'Korean', 'Chinese', 'Mixed'],
    }
  }

  componentDidMount() {

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
            </div>
          )
        }
      }
      this.setState({cartItemsState:cartItems})
      this.setState({cartSubtotal:subTotal})
    }

    fetch(`/getCart/:${document.cookie.split('=')[1]}`)
            .then(data => data.json())
            .then(data => {
              console.log(data)
              cartContents = data
            })
            .then(() => renderCart())
          
  }

  render() {

        return (
          
        <div>
          <Header />
          <h2>Checkout</h2>

          <Link to={'/shop'}>
            <button
              type="button"
            >
              not ready to purchase yet?
            </button>
          </Link>

          <div>
            <h2>{document.cookie.split('=')[1]}'s Cart</h2>
            <hr/>
            {'IMPORT CART ITEM HERE'}
            {this.state.cartItemsState}

            <hr/>
            <strong>Subtotal:</strong> ${this.state.cartSubtotal.toFixed(2)}
            <br/>
            <strong>Taxes:</strong>${(this.state.cartSubtotal * 0.08).toFixed(2)}
            <br/>
            <strong>Shipping:</strong> Free Shipping (3 to 5 Business Days)
            <br/>
            <strong>Total:</strong> ${(this.state.cartSubtotal * 1.08).toFixed(2)}
            <br/>
          </div>

    <div className="mb-2 top">
            <form method="POST" action='/checkout'>
              <input type="hidden" name="username" value={document.cookie.split('=')[1]}/>
              <h3>Customer Information</h3>
                <div className="form-row">
                    <div className="form-group col-8">
                        <label htmlFor="firstname"></label>
                        <input name="firstname" id="firstname" placeholder="First Name *" type="text" required className="form-control"/>
                    </div>

                    <div className="form-group col-8">
                        <label htmlFor="lastname"></label>
                        <input name= "lastname" id="lastname" placeholder="Last Name *" type="text" required className="form-control"/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="Address"></label>
                        <input name= "Address" id="Address" placeholder="Address Line 1 *" type="text" required className="form-control"></input>
                    </div>

                    <div className="form-group">
                        <label htmlFor="Address2"></label>
                        <input name= "Address2" id="Address2" placeholder="APT, SUITE, ETC. (OPTIONAL)" type="text" className="form-control"></input>
                    </div>

                <div>
                  <div className="form-group">
                      <label htmlFor="city"></label>
                      <input name= "city" id="city" type="text" placeholder="City *" className="form-control" required ></input>
                  </div>
                  <br></br>
                  <label htmlFor="state"></label>
                  <select id="state" name="state" required>
                    <option disabled>State *</option>
                    <option value="AL">Alabama</option>
                    <option value="AK">Alaska</option>
                    <option value="AZ">Arizona</option>
                    <option value="AR">Arkansas</option>
                    <option value="CA">California</option>
                    <option value="CO">Colorado</option>
                    <option value="CT">Connecticut</option>
                    <option value="DE">Delaware</option>
                    <option value="DC">District Of Columbia</option>
                    <option value="FL">Florida</option>
                    <option value="GA">Georgia</option>
                    <option value="HI">Hawaii</option>
                    <option value="ID">Idaho</option>
                    <option value="IL">Illinois</option>
                    <option value="IN">Indiana</option>
                    <option value="IA">Iowa</option>
                    <option value="KS">Kansas</option>
                    <option value="KY">Kentucky</option>
                    <option value="LA">Louisiana</option>
                    <option value="ME">Maine</option>
                    <option value="MD">Maryland</option>
                    <option value="MA">Massachusetts</option>
                    <option value="MI">Michigan</option>
                    <option value="MN">Minnesota</option>
                    <option value="MS">Mississippi</option>
                    <option value="MO">Missouri</option>
                    <option value="MT">Montana</option>
                    <option value="NE">Nebraska</option>
                    <option value="NV">Nevada</option>
                    <option value="NH">New Hampshire</option>
                    <option value="NJ">New Jersey</option>
                    <option value="NM">New Mexico</option>
                    <option value="NY">New York</option>
                    <option value="NC">North Carolina</option>
                    <option value="ND">North Dakota</option>
                    <option value="OH">Ohio</option>
                    <option value="OK">Oklahoma</option>
                    <option value="OR">Oregon</option>
                    <option value="PA">Pennsylvania</option>
                    <option value="RI">Rhode Island</option>
                    <option value="SC">South Carolina</option>
                    <option value="SD">South Dakota</option>
                    <option value="TN">Tennessee</option>
                    <option value="TX">Texas</option>
                    <option value="UT">Utah</option>
                    <option value="VT">Vermont</option>
                    <option value="VA">Virginia</option>
                    <option value="WA">Washington</option>
                    <option value="WV">West Virginia</option>
                    <option value="WI">Wisconsin</option>
                    <option value="WY">Wyoming</option>
                  </select>

                  <div className="form-group">
                        <label htmlFor="zipcode"></label>
                        <input name= "zipcode" id="zipcode" placeholder="Zip Code *" className="form-control" required type="number"></input>
                    </div>
                </div>

                <div className="form-group">
                      <label htmlFor="phone"></label>
                      <input name= "tel" type="tel" id="phone" placeholder="Phone Number" className="form-control"></input>
                  </div>

                  <div className="form-group">
                      <label htmlFor="email"></label>
                      <input name= "email" type="email" id="email" placeholder="Email Address *" required className="form-control"></input>
                  </div>

                  <h3>Payment Information</h3>
                  <div className="form-group">
                      <label htmlFor="cardname"></label>
                      <input name= "cardname" type="number" id="cardname" placeholder="Name on Card *" required className="form-control"></input>
                  </div>

                  <div className="form-group">
                      <label htmlFor="cardnumber"></label>
                      <input name= "cardnumber" type="number" id="cardnumber" placeholder="Card Number *" required className="form-control"></input>
                  </div>

                  <div>
                  <div className="form-group">
                      <label htmlFor="cardexpire"></label>
                      <input name= "cardexpire" type="text" id="cardexpire" placeholder="MM / YY *" required className="form-control"></input>
                  </div>

                  <div className="form-group">
                      <label htmlFor="code"></label>
                      <input name= "code" type="number" id="code" placeholder="Security Code *" required maxLength="3"  className="form-control"></input>
                  </div>

                  </div>
                <br></br>
                <button 
                type="submit">Confirm Purchase</button>
                </div>
            </form>
        </div>
        </div>
        )
      }
};

export default Checkout;