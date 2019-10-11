import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';
class HighScore extends Component {
  constructor() {
    super();
    this.state = {
      scoresList : []
    };
  }

  componentDidMount = ()=> {
    var self = this;
    axios.get('https://protected-reaches-53904.herokuapp.com/getall')
  .then(function (response) {
    // handle success
    self.setState({scoresList : response.data});
  })
  }


  componentDidUpdate = () => {
        var self = this;
    axios.get('https://protected-reaches-53904.herokuapp.com/getall')
  .then(function (response) {
    // handle success
    self.setState({scoresList : response.data});
  })

  }



  render() {

    let scores = this.state.scoresList.map(
      (score) => { 
        var timestamp = score._id.toString().substring(0,8);
       var date = new Date( parseInt( timestamp, 16 ) * 1000 );
       var temp = moment(date).format('MMMM Do YYYY, h:mm:ss a'); 

      // console.log(date);
     return (  <tr key = {score._id} > <td class = "text-center" data-label = "Name"> <strong
     >  {score.name} </strong></td>  <td class = "text-center" data-label = "Score"> {score.score}</td> <td class = "text-center" data-label = "Submitted At"> {temp}</td> </tr> )  });


    return (
      <div className = "d-flex w-50 my-5 p-1 justify-content-center align-items-center">
        <table class="ui celled table">
  <thead>
    <tr><th class = "text-center"><i class="fa-2x fas fa-user"></i></th>
    <th class = "text-center"><i class="fas fa-trophy fa-2x"></i></th>
    <th  class = "text-center"><i class="fas fa-clock fa-2x"></i> </th>

  </tr></thead>
  <tbody>
        {scores}

  </tbody>
</table>

      </div>
    );

  }
}

export default HighScore;