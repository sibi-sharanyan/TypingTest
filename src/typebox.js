import React, { Component } from 'react';
import axios from 'axios';
const swal = require('sweetalert');



class TypeBox extends Component {
  constructor(props) {
    super(props);


    this.state = {
      name: null,
      word1: props.words[0],
      word2: props.words[1],
      word3: props.words[2],
      word4: props.words[3],
      word5: props.words[4],
      cword: '',
      status: 'text-secondary',
      currcnt: 1,
      correct: 0,
      wrong: 0,
      secondsRemaining: 60,
      timeStarted: false,
      sandicon: "fas fa-hourglass-start text-warning"
    };
    this.t = null;
  }


  changeHandler = (e) => {

    if (this.state.timeStarted == false) {
      this.t = setInterval(() => {
        this.setState({ secondsRemaining: this.state.secondsRemaining - 1 });
        if (this.state.secondsRemaining == 40) {
          this.setState({ sandicon: "fas fa-hourglass-half text-warning" });
        }
        if (this.state.secondsRemaining == 20) {
          this.setState({ sandicon: "fas fa-hourglass-end text-warning" });
        }
      }, 1000);
      this.setState({ timeStarted: true });
    }

    this.setState({ cword: e.target.value });


    if (e.target.value == this.state.cword + ' ') {
      this.setState({ cword: '' });
      if ((this.state.status == 'text-success' && e.target.value.length - 1 == this.state.word1.length)) {
        this.setState({ correct: this.state.correct + 1 });
      } else {
        this.setState({ wrong: this.state.wrong + 1 });
      }

      var cnt = this.state.currcnt;
      this.setState({ word1: this.props.words[cnt], word2: this.props.words[cnt + 1], word3: this.props.words[cnt + 2], word4: this.props.words[cnt + 3], word5: this.props.words[cnt + 4], currcnt: cnt + 1, cword: '', status: 'text-secondary' });

      return;

    }



    if (e.target.value == '') {
      this.setState({ status: 'text-secondary' });
    }
    var myWord = e.target.value;
    var len = myWord.length;
    var isWrong = false;
    for (var i = 0; i < len; i++) {
      if (this.state.word1.charAt(i) != myWord.charAt(i)) {

        this.setState({ status: 'text-danger' });
        isWrong = true;
      }
    }

    if (!isWrong && e.target.value != '') {
      this.setState({ status: 'text-success' })
    }


  }


  reset = (e) => {
    if(e == 'over')
    {
    this.props.resetApp(this.state.correct);
    }else 
    {
      this.props.resetApp(null);
    }
    this.setState({
      name: null,
      word1: this.props.words[0],
      word2: this.props.words[1],
      word3: this.props.words[2],
      word4: this.props.words[3],
      word5: this.props.words[4],
      cword: '',
      status: 'text-secondary',
      currcnt: 1,
      correct: 0,
      wrong: 0,
      secondsRemaining: 60,
      timeStarted: false,
      sandicon: "fas fa-hourglass-start text-warning"
    });

    clearInterval(this.t);
  }


  componentDidUpdate = () => {
    if (this.state.secondsRemaining <= 0) {
      swal("Your Time is Up!", "Your Average WPM is : " + this.state.correct + "\n" + "Your Accuracy rate is : " + ((this.state.correct) / ((this.state.wrong) + (this.state.correct)) * 100) + "%", "success");



      this.reset('over');
    }


  }



  render() {


    return (
      <div className="mt-5">
        <div className="d-flex justify-content-around" >
          <h1> <i class={this.state.sandicon}></i>  {this.state.secondsRemaining}s</h1>
          <h1> <i class="fas fa-check-circle text-success"></i>  {this.state.correct} </h1>
          <h1> <i class="fas fa-times-circle text-danger"></i>  {this.state.wrong} </h1>

        </div>

        <div id="textbox" className="shadow-lg p-5 m-5 bg-white rounded"> <span className={this.state.status}> {this.state.word1} </span> <span> {this.state.word2} </span> <span> {this.state.word3} </span> <span> {this.state.word4} </span> <span> {this.state.word5} </span> </div>

        <div class="ui form d-flex">


          <input className="ml-5 p-3 w-25" type="text" value={this.state.cword} onChange={(e) => this.changeHandler(e)} />

          <button onClick={(e) => this.reset(e)} className="ui p-3 primary button mx-3"> <i class="fas fa-sync-alt fa-2x"></i> </button>
        </div>



      </div>
    );

  }
}


export default TypeBox;

