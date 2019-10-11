import React, { Component } from 'react';

class NameBox extends Component {
  constructor() {
    super();
    this.state = {
      name: null ,
      setPress : false
    };
  }

  setName = (e)=> {
this.setState({setPress : true});
this.props.getName(this.state.name);
  }


  render() {
    if(this.state.setPress == false) 
    {
    return (
      <div className = "d-flex w-50 m-2 p-1 justify-content-around align-items-center">
  <div className = "text-nowrap lead mx-3"> Enter Name: </div>
  <input className = "form-control" type = "text" value = {this.state.name} onChange = {(e) => this.setState({name: e.target.value})} />
  <button className = "ui primary button mx-3" onClick = {(e) => this.setName(e) }> Set </button>
      </div>
    );
  }else {
        return (
      <div className = "d-flex justify-content-center align-items-center m-2">
  <div className = "lead"> You are playing as <strong> {this.state.name} </strong>  </div>
   <i class="mx-2 fas fa-user-edit fa-2x text-primary" onClick = {(e) => this.setState({setPress : false , name : this.state.name})}></i>

      </div>
    );
  }
  }
}

export default NameBox;