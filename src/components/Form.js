import React, { Component } from 'react'
import ProteinForm from './ProteinForm'
import FillingForm from './FillingForm'
import ToppingForm from './ToppingForm'
import SideForm from './SideForm'
import ccm from '../ccm.json'

const DEFAULT_STATE = {
  protein: [],
  fillings: [],
  toppings: [],
  sides: []
}

class Form extends Component {
  constructor(props){
    super(props)
  this.state = {
    ...DEFAULT_STATE,
  };
  this.handleChange=this.handleChange.bind(this)
  this.handleSubmit=this.handleSubmit.bind(this)
}

  handleSubmit(event) {
    event.preventDefault()
    document.getElementById("order-form").reset()
    this.props.addOrder(this.state)

    this.setState({
      ...DEFAULT_STATE
    })
  }

  handleChange(event) {
    
    const itemType = event.target.name
    const item = event.target.value
    

    !this.state[`${itemType}`].includes(item)
    ? ((itemType==="protein" && this.state.protein.length<2) || (itemType==="fillings" && this.state.fillings.length<3 && (((item==="White Rice" || item==="Brown Rice") && !this.state[`${itemType}`].some(el=>el.includes("Rice"))) || ((item==="Black Beans" || item==="Pinto Beans") && !this.state[`${itemType}`].some(el=>el.includes("Beans")))||item==="Fajita Veggies" )) || itemType==="toppings" || (itemType==="sides" && this.state.sides.length<2) 
    ? 
      this.setState({
        [itemType]: this.state[`${itemType}`].concat(item)
      })
    :
      this.setState({
        [itemType]: this.state[`${itemType}`].filter(
          ingr => ingr !== item
        )
      })) 
      : 
      this.setState({
        [itemType]: this.state[`${itemType}`].filter(
          ingr => ingr !== item
        )
      })
  }

  render() { 
    console.log(ccm)
    return(
      <div className="ui raised container segment">
        <h1 className="ui block header">Order Form</h1>
        <form className="ui form" id="order-form" onSubmit={ this.handleSubmit }>
          { ccm.showProtein && (<ProteinForm
            protein={ this.state.protein }
            handleChange={ this.handleChange }
          />)}

        { ccm.showFillings && (<FillingForm
            fillings={ this.state.fillings }
            handleChange={ this.handleChange }
          />)}

        { ccm.showToppings && (<ToppingForm
            toppings={ this.state.toppings }
            handleChange={ this.handleChange }
          />)}

        { ccm.showSides && (<SideForm
            sides={ this.state.sides }
            handleChange={ this.handleChange }
          />)}

          <br />

          <button className="ui blue big button" type="submit">Submit</button>
        </form>
      </div>
    )
  }
}

export default Form
