import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import Checkout from './components/Checkout.jsx'
import Box from './components/Box.jsx'
import Shop from './components/Shop.jsx'
import Login from './components/Login.jsx'
import Confirmation from './components/Confirmation.jsx';


class App extends Component {
    constructor(props) {
      super(props);
    }
    render() {
        return (
            <div className="router">
                <main>
                    <Switch>
                        <Route
                            exact path="/"
                            component={Login}
                        />
                        <Route
                            exact path="/shop/checkout"
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
                </main>
            </div>
        )
    }
};

export default App;