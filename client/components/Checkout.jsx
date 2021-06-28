import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header.jsx'

const Checkout = props => {
  

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
      My Cart

      {'IMPORT CART ITEM HERE'}
      

      <hr/>
      Subtotal: {'whatever is the total price added from database'}
      Tax: {'tax calc'}
      Shipping: always free
      Total: {'subtotal + tax'}
    </div>

    <div className="mb-2 top">
            <form method="POST" action='/shop/checkout'>

              <h3>Customer Information</h3>
                <div className="form-row">
                    <div className="form-group col-8">
                        <label htmlFor="firstname"></label>
                        <input id="firstname" placeholder="First Name *" type="text" required className="form-control"/>
                    </div>

                    <div className="form-group col-8">
                        <label htmlFor="lastname"></label>
                        <input id="lastname" placeholder="Last Name *" type="text" required className="form-control"/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="Address"></label>
                        <input id="Address" placeholder="Address Line 1 *" type="text" required className="form-control"></input>
                    </div>

                    <div className="form-group">
                        <label htmlFor="Address2"></label>
                        <input id="Address2" placeholder="APT, SUITE, ETC. (OPTIONAL)" type="text" className="form-control"></input>
                    </div>

                <div>
                  <div className="form-group">
                      <label htmlFor="city"></label>
                      <input id="city" type="text" placeholder="City *" className="form-control" required ></input>
                  </div>

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
                        <input id="zipcode" placeholder="Zip Code *" className="form-control" required type="number"></input>
                    </div>
                </div>

                <div className="form-group">
                      <label htmlFor="phone"></label>
                      <input type="tel" id="phone" placeholder="Phone Number" className="form-control"></input>
                  </div>

                  <div className="form-group">
                      <label htmlFor="email"></label>
                      <input type="email" id="email" placeholder="Email Address *" required className="form-control"></input>
                  </div>

                  <h3>Payment Information</h3>
                  <div className="form-group">
                      <label htmlFor="cardname"></label>
                      <input type="number" id="cardname" placeholder="Name on Card *" required className="form-control"></input>
                  </div>

                  <div className="form-group">
                      <label htmlFor="cardnumber"></label>
                      <input type="number" id="cardnumber" placeholder="Card Number *" required className="form-control"></input>
                  </div>

                  <div>
                  <div className="form-group">
                      <label htmlFor="cardexpire"></label>
                      <input type="text" id="cardexpire" placeholder="MM / YY *" required className="form-control"></input>
                  </div>

                  <div className="form-group">
                      <label htmlFor="code"></label>
                      <input type="number" id="code" placeholder="Security Code *" required maxLength="3"  className="form-control"></input>
                  </div>

                  </div>

                <button 
                type="submit">Confirm Purchase</button>
                </div>
            </form>
        </div>
  </div>

  )
};

export default Checkout;