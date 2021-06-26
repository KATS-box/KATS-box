import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './components/Home.jsx'
import Checkout from './components/Checkout.jsx'
import Box from './components/Box.jsx'
import Shop from './components/Shop.jsx'
import Login from './components/Login.jsx'
import Signup from './components/Signup.jsx'

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
                            component={Home}
                        />
                        <Route
                            exact path="/login"
                            component={Login}
                        />
                        <Route
                            exact path="/signup"
                            component={Signup}
                        />
                        <Route
                            exact path="/home/checkout"
                            component={Checkout}
                        />
                        <Route
                            exact path="/box"
                            component={Box}
                        />
                        <Route
                            exact path="/shop"
                            component={Shop}
                        />
                    </Switch>
                </main>
            </div>
        )
    }
};

export default App;