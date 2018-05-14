import React, {Component} from 'react';
import firebase from './firebase.js';
import FictionQuestions from './FictionQuestions.js';
import './AddQuestions.css'

class AddQuestionsFiction extends Component {

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
    this.basestate = this.state
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

  sendQuestion = () => {
    let self = this;
    firebase.database().ref('questions/genre/fiction/').push({
      Question: this.state.question,
      answers: {
        a: this.state.a,
        b: this.state.b,
        c: this.state.c,
        d: this.state.d
      },
      correctAnswer: this.state.correctAnswer
    })
    this.setState({sendMessage: 'Your question have been sent, sir!', divId: 'itHasBeenSent'})
    setInterval(function() {
      self.setState({sendMessage: '', divId: ''})
    }, 4000);

  //   this.setState({
  //   question: '',
  //   a: '',
  //   b: '',
  //   c: '',
  //   d: '',
  //   correctAnswer: ''
  // })
  this.resetIt();
  }

  resetIt = () => {
    this.setState({
        question: '',
        a: '',
        b: '',
        c: '',
        d: '',
        correctAnswer: ''
      })
      this.myFormRef.reset();
  }

  render() {
      const { a,b,c,d,question,correctAnswer} = this.state
      const enabled =
            a.length > 0 &&
            b.length > 0 &&
            c.length > 0 &&
            d.length > 0 &&
            question.length > 0 &&
            correctAnswer.length > 0


    if (!this.state.goBack) {
      return (<div>
        <FictionQuestions profile={this.props.profile} firebaseKey={this.props.firebaseKey} nickname={this.props.nickname}/>
      </div>)
    }

    return (<div>
      <h2>Create your own fiction Question!</h2>
      <br/>

      <div>
        <form ref={(el) => this.myFormRef = el}id="theForm"onChange={this.clearIt}>
          <h3>What fiction question do you want to add?
          </h3><br/>
          <input className="questionInput" type="text" onChange={this.handleChangeQuestion}/>
          <br/>Answer A:<label><input className="answerInput" type="text" onChange={this.handleChangeA}/><input type="radio" className="radioButton" value="a" name="chooseOne" onClick={this.correctAnswer}/></label>
          <br/>Answer B:<label><input className="answerInput" type="text" onChange={this.handleChangeB}/><input type="radio" className="radioButton" value="b" name="chooseOne" onClick={this.correctAnswer}/></label>
          <br/>Answer C:<label><input className="answerInput" type="text" onChange={this.handleChangeC}/><input type="radio" className="radioButton" value="c" name="chooseOne" onClick={this.correctAnswer}/></label>
          <br/>Answer D:<label><input className="answerInput" type="text" onChange={this.handleChangeD}/><input type="radio" className="radioButton" value="d" name="chooseOne" onClick={this.correctAnswer}/></label>
        </form>
      </div>
      <br/>
      <button disabled={!enabled} id="btnSend" onClick={this.sendQuestion}>Send Question!</button>

      <button className="btnQ" onClick={this.goBack} >Back to fiction page</button>
      <div id={this.state.divId}>{this.state.sendMessage}</div>
    </div>)
  }

}
export default AddQuestionsFiction;
