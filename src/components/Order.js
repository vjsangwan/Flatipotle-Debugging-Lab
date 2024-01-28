import React, { Component } from 'react'
import Side from './Side'

class Order extends Component {
  constructor(props){
    super(props);
  this.state = {

    isClicked:false
  }
}

  handleClick = () => {
    this.setState({isClicked:!this.state.isClicked})
  }

  
  render() {
    return (
      <div className="ui centered raised card">
        <button onClick={()=>this.props.handleEdit(this.props.orderId)}> Edit </button>
        <div className="image">
          <img src={ require("../images/burrito-bowl.jpg") } alt="burrito bowl" />
        </div>
        <div className="content">
          <b>Order # {this.props.orderId}</b><br />
          <b>Protein:</b><br />
          { this.props.protein.length > 0 ? this.props.protein.join(", ") : "None" }
          <br />
          <b>Fillings:</b><br />
          { this.props.fillings.length > 0 ? this.props.fillings.join(", ") : "None" }
          <br />
          <b>Toppings:</b><br />
          { this.props.toppings.length > 0 ? this.props.toppings.join(", ") : "None" }
          <br />
          {(this.props.protein.length===1 && this.props.protein.includes("Sofritas")) || this.props.protein.length===0 ?
          <b style={{color:"green"}}> Veg</b> : <b style={{color:"red"}}> Non veg</b>
          }
        </div>
        <div className="extra content">
          { this.props.sides.length > 0 ?
              <button className="ui button small" onClick={ this.handleClick }>
                View Sides
              </button>
            :
              <p>No sides</p>
          }

          { /* this is just a shortcut to writing this.state.isClicked ? <Side sides={this.props.sides} /> : null */ }
          { this.state.isClicked && <Side sides={this.props.sides} /> }

        </div>
      </div>
    )
  }
}

export default Order
