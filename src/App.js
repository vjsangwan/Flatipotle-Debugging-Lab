import React, { Component } from 'react'
import './App.css'
import Form from './components/Form'
import Order from './components/Order'

class App extends Component {
  state= {
    orders: [],
    hasUnsavedChanges: false,
    showSaveButton:null,
    showDeleteButton:null,
    orderToBeUpdated:null
  }
  handleEdit=(orderId)=>{
    const orderToBeUpdated=this.state.orders.find(order=>order.orderId===orderId)
    const index=this.state.orders.indexOf(orderToBeUpdated);
    this.setState({
      orderToBeUpdated:orderToBeUpdated,

    })
    orderToBeUpdated.protein.length>0 && orderToBeUpdated.protein.forEach(protein=>{  
      document.getElementById(protein).checked=true
    })
    

    console.log(orderToBeUpdated)
  }

handleSave = () => {
  localStorage.setItem('orders', JSON.stringify(this.state.orders))
  this.setState({
    hasUnsavedChanges: false,
  })
  }
  handleDelete=()=>{
    localStorage.removeItem('orders')

    this.setState({
      orders:[],
    })
    
  }
 
componentDidMount(){
 // read cookie and maintain a state variable from cookie;
 const getCookie= (name)=>{
  
  const cookies=document.cookie.split(';')
  for(const cookie of cookies){
  const[cookieName, cookieValue]=cookie.trim().split("=")  
  if(cookieName===name){
    return cookieValue;
  }
  }
  return null;
}

 getCookie('isSaveEnabled')==='true' ? this.setState({showSaveButton:true}) : this.setState({showSaveButton:false})
 getCookie('isDeleteEnabled')==='true'?this.setState({showDeleteButton:true}) : this.setState({showDeleteButton:false})


  const order=JSON.parse(localStorage.getItem('orders'))
  if(order){
    this.setState({
      orders:order,
     
    })
  }
}

  addOrder = (order) => {
    this.setState({
      orders: this.state.orders.concat(order),
      hasUnsavedChanges: true,
    })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={ require('./images/logo.png') } className="App-logo" alt="logo" />
        </header>

        <Form addOrder={this.addOrder} orderToBeUpdated={this.state.orderToBeUpdated}/>

        <div className="ui raised container segment">
      
      <div style={{ position: 'relative' }}>
      <h1 className="ui block header">All Orders</h1>

     {this.state.showSaveButton && (<button onClick={this.handleSave} disabled={!this.state.hasUnsavedChanges} style={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)', marginRight: 100 }}>Save</button>)}
     {this.state.showDeleteButton && (<button onClick={this.handleDelete} disabled={this.state.orders.length===0} style={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)', marginRight: 20 }}>Delete</button>)}
    </div>   
        <div className="ui three cards">
          {this.state.orders.map( (order, idx) =>
            <Order key={idx} {...order} handleEdit={this.handleEdit}/>
          )}
        </div>
        </div>
      </div>
    )
  }
}

export default App
