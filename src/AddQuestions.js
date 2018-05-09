import React, {Component} from 'react';
import firebase from './firebase.js';
import SportQuestions from './sportQuestions.js';
class AddQuestions extends Component {

  constructor(props) {
    super(props)
    this.state = {
      goBack: true,
      answers: {},
      question: {},
      correctAnswer: {}

    }

  }

  goBack = () => {
    console.log(this.state.goBack)
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

  correctAnswer = (event) => {
    this.setState({correctAnswer: event.target.value})

  }

  sendQuestion = () => {

    firebase.database().ref('questions/genre/sport/').push({

      Question: this.state.question,

      answers: {
        a: this.state.a,
        b: this.state.b,
        c: this.state.c,
        d: this.state.d
      },
      correctAnswer: this.state.correctAnswer

    })

  }

  render() {

    if (!this.state.goBack) {
      return (<div>
        <SportQuestions/>
      </div>)
    }

    return (<div>Create your own sport Question!
      <br/>
      <button onClick={this.goBack}>Back to SportPage</button>

      <form>
        <br/>What sport question do you want to add?
        <input type="text" onChange={this.handleChangeQuestion}/>
        <br/>Answer A:<label><input type="text" onChange={this.handleChangeA}/><input type="radio" id="radioButton" value="a" name="chooseOne" onClick={this.correctAnswer}/></label>
        <br/>Answer B:<label><input type="text" onChange={this.handleChangeB}/><input type="radio" id="radioButton" value="b" name="chooseOne" onClick={this.correctAnswer}/></label>
        <br/>Answer C:<label><input type="text" onChange={this.handleChangeC}/><input type="radio" id="radioButton" value="c" name="chooseOne" onClick={this.correctAnswer}/></label>
        <br/>Answer D:<label><input type="text" onChange={this.handleChangeD}/><input type="radio" id="radioButton" value="d" name="chooseOne" onClick={this.correctAnswer}/></label>
      </form>

      <br/>
      <button onClick={this.sendQuestion}>Send Question!</button>
    </div>)
  }

}
export default AddQuestions;
