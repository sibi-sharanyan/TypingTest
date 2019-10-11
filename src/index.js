import React, { Component } from 'react';
import { render } from 'react-dom';
import Hello from './Hello';
import NameBox from './namebox';
import TypeBox from './typebox';
import HighScore from './highscore.js';
import words from './words.json';
import './style.css';
import axios from 'axios';
class App extends Component {
  constructor() {
    super();



   var wordarr = [];
    for(var i = 0 ; i < 250 ; i++)
    {
      wordarr.push(words[Math.floor((Math.random() * 3000) + 1) ]);
    }
   
        this.state = {
      name: null,
      arr: wordarr,
      score: null
    };
  }

  reset = (score) => {

    if(score != null && this.state.name != null) 
    {
    axios.get('https://protected-reaches-53904.herokuapp.com/addrecord/' + this.state.name + '/' + score).then((response) => {
      this.setState({score: response.data[0].score});
    });
    }



       var wordarr = [];
    for(var i = 0 ; i < 250 ; i++)
    {
      wordarr.push(words[Math.floor((Math.random() * 3000) + 1) ]);
    }
    this.setState({
      arr: wordarr
    });

  } 

  getName =  (name) => {
    // console.log(name);
    this.setState({name : name});
  }

  render() {
    return (
 
      <div className = "d-flex flex-column justify-content-center align-items-center">

        <NameBox getName = {this.getName} />
      <TypeBox words = {this.state.arr} resetApp = {this.reset} name = {this.state.name}/>
    <HighScore  score = {this.state.score}/>

      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
