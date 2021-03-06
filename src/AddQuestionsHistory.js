import React, {Component} from 'react';
import firebase from './firebase.js';
import HistoryQuestions from './historyQuestions.js';
import './AddQuestions.css'
class AddQuestionsHistory extends Component {

  constructor(props) {
    super(props)
    this.state = {
      goBack: true,
      a: '',
      b: '',
      c: '',
      d: '',
      question: '',
      correctAnswer: '',
      sendMessage: '',
      divId: ''
    }
    console.log(this.props.profile)
  }

  goBack = () => {
    this.setState({goBack: false})
  }

  handleChangeQuestion = (e) => {
    this.setState({question: e.target.value})
  }

  handleChangeA = (e) => {
    this.setState({a: e.target.value})
  }

  handleChangeB = (e) => {
    this.setState({b: e.target.value})
  }

  handleChangeC = (e) => {
    this.setState({c: e.target.value})
  }

  handleChangeD = (e) => {
    this.setState({d: e.target.value})
  }

  correctAnswer = (e) => {
    this.setState({correctAnswer: e.target.value})
  }

  componentDidMount() {
        let btnSend = document.getElementById("btnSend");
        btnSend.disabled = true;
  }

  componentDidUpdate() {
     let btnSend = document.getElementById("btnSend")
     console.log(btnSend)
     if(btnSend === null) {
       console.log("you will come here")

     }else{

     btnSend.disabled = true;
         if(this.state.question !== '' && this.state.correctAnswer !== '' &&
           this.state.a !== '' && this.state.b !== '' && this.state.c !== '' && this.state.d !== '') {
         btnSend.disabled = false
       }
     }
     }
  sendQuestion = () => {
    let self = this;
    let form = document.getElementById("theForm");
    firebase.database().ref('questions/genre/History/').push({
      Question: this.state.question,
      answers: {
        a: this.state.a,
        b: this.state.b,
        c: this.state.c,
        d: this.state.d
      },
      correctAnswer: this.state.correctAnswer
    })

    form.reset();

    this.setState({sendMessage: 'Your question have been sent, sir!', divId: 'itHasBeenSent'})

    setInterval(function() {
      self.setState({sendMessage: '', divId: ''})
    }, 4000);

    this.setState({
    question: '',
    a: '',
    b: '',
    c: '',
    d: '',
    correctAnswer: ''
  })
  }

  render() {

    if (!this.state.goBack) {
      return (<div>
        <HistoryQuestions profile={this.props.profile} firebaseKey={this.props.firebaseKey} nickname={this.props.nickname}/>
      </div>)
    }

    return (<div>
      <h2>Create your own history Question!</h2>
      <br/>

      <div>
        <form id="theForm">
          <h3>What history question do you want to add?
          </h3><br/>
          <input className="questionInput" type="text" onChange={this.handleChangeQuestion}/>
          <br/>Answer A:<label><input className="answerInput" type="text" onChange={this.handleChangeA}/><input type="radio" className="radioButton" value="a" name="chooseOne" onClick={this.correctAnswer}/></label>
          <br/>Answer B:<label><input className="answerInput" type="text" onChange={this.handleChangeB}/><input type="radio" className="radioButton" value="b" name="chooseOne" onClick={this.correctAnswer}/></label>
          <br/>Answer C:<label><input className="answerInput" type="text" onChange={this.handleChangeC}/><input type="radio" className="radioButton" value="c" name="chooseOne" onClick={this.correctAnswer}/></label>
          <br/>Answer D:<label><input className="answerInput" type="text" onChange={this.handleChangeD}/><input type="radio" className="radioButton" value="d" name="chooseOne" onClick={this.correctAnswer}/></label>
        </form>
      </div>
      <br/>
      <button id="btnSend" className="btnQ" onClick={this.sendQuestion}>Send Question!</button>
      <button className="btnQ" onClick={this.goBack} >Back to SportPage</button>
      <div id={this.state.divId}>{this.state.sendMessage}</div>
    </div>)
  }

}
export default AddQuestionsHistory;
