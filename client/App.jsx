import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import Checkout from './components/Checkout.jsx'
import Box from './components/Box.jsx'
import Shop from './components/Shop.jsx'
import Login from './components/Login.jsx'
import Confirmation from './components/Confirmation.jsx';
import ScrollToTop from './components/ScrollToTop.js'


class App extends Component {
    constructor(props) {
      super(props);
    }
    render() {
        return (
            <div className="router">
                <main>
                    <ScrollToTop>
                        <Switch>
                            <Route
                                exact path="/"
                                component={Login}
                            />
                            <Route
                                exact path="/checkout"
                                component={Checkout}
                            />
                            <Route
                                path="/shop/box"
                                component={Box}
                            />
                            <Route
                                exact path="/shop"
                                component={Shop}
                            />
                            <Route
                            exact path="/confirmation"
                            component={Confirmation}
                        />
                        </Switch>
                    </ScrollToTop>
                </main>
            </div>
        )
    }
};

export default App;