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
      divId: '',
      quest: '',



     }
  }

  goBack = () => {
    this.setState({goBack: false})
  }

  handleChangeQuestion = (e) => {
    this.setState({question: e.target.value})
    //this.setState({quest: e.target.value})
  }

  handleChangeA = (e) => {
    this.setState({a: e.target.value})
    // this.setState({quest: e.target.value})
  }

  handleChangeB = (e) => {
    this.setState({b: e.target.value})
   // this.setState({quest: e.target.value})

  }

  handleChangeC = (e) => {
    this.setState({c: e.target.value})
   // this.setState({quest: e.target.value})
  }

  handleChangeD = (e) => {
    this.setState({d: e.target.value})
   // this.setState({quest: e.target.value})


  }

  correctAnswer = (e) => {
    this.setState({correctAnswer: e.target.value})
   // this.setState({quest: e.target.value})
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
   // console.log(this.state.question)


  }




  render() {



      let { a,b,c,d,question,correctAnswer} = this.state
      let enabled =
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
      <h2 className="h3Head">Create your own fiction Question!</h2>
      <br/>
        <button className="btnQ" onClick={this.goBack} >Back to FictionPage</button>
       <div className="quizDiv">
            <div onClick={this.backToProfile} profile={this.props.profile}>
              <h3>{this.state.nickname}</h3>
                <img className="img" src={this.props.profile.photo + "?width=999"} alt=" "/>
            </div>
          </div>
      <div>

        <form ref={(el) => this.myFormRef = el}id="theForm"onChange={this.clearIt}>
          <h3 className="h3Head">What fiction question do you want to add?
          </h3><br/>
          <input className="questionInput" type="text" onChange={this.handleChangeQuestion}/>
          <br/><p className="letter">Answer A:</p><label><input className="answerInput" type="text" onChange={this.handleChangeA}/><input type="radio" className="radioButton" value="a" name="chooseOne" onClick={this.correctAnswer}/></label>
          <br/><p className="letter">Answer B:</p><label><input className="answerInput" type="text" onChange={this.handleChangeB}/><input type="radio" className="radioButton" value="b" name="chooseOne" onClick={this.correctAnswer}/></label>
          <br/><p className="letter">Answer C:</p><label><input className="answerInput" type="text" onChange={this.handleChangeC}/><input type="radio" className="radioButton" value="c" name="chooseOne" onClick={this.correctAnswer}/></label>
          <br/><p className="letter">Answer D:</p><label><input className="answerInput" type="text" onChange={this.handleChangeD}/><input type="radio" className="radioButton" value="d" name="chooseOne" onClick={this.correctAnswer}/></label>
        </form>
      </div>
      <br/>


      <button disabled={!enabled} className="btnSend" onClick={this.sendQuestion}>Send Question!</button>
      <div id={this.state.divId}>{this.state.sendMessage}</div>
    </div>)
  }

}
export default AddQuestionsFiction;
