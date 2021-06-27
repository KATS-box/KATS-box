import React, { Component } from "react";

class ShoppingCartModal extends Component {


  render() {
    
    if(!this.props.show){
      return null;
    }

    return (
      <div>
        <div>
          {this.props.children}
        </div>
      </div>
    );
  }
}


export default ShoppingCartModal