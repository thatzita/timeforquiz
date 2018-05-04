import React, {Component} from 'react';
import './quiz.css';
import ProfileComponent from './ProfileComponent.js';
import Questions from './questions.js';

class Quiz extends Component {
  constructor(props) {
    super(props)
    this.state = {
      clicked: true,
      clickedQuiz: true
    }
  }

  goBack = () => {
    this.setState({clicked: false})
  }

  fictionQuiz = () => {
    console.log("this is a quiz about fiction");
    this.setState({clickedQuiz: false})
  }

  historyQuiz = () => {
    console.log("this is a quiz a bout history");
    this.setState({clickedQuiz: false})
  }

  sportQuiz = () => {
    console.log("this is a quiz a bout sport");
    this.setState({clickedQuiz: false})
  }

  render() {

    if (!this.state.clicked) {
      return (<div>
        <ProfileComponent profile={this.props.profile}/>
      </div>)
    }

    if (!this.state.clickedQuiz) {
      return (<div>
        <Questions profile={this.props.profile}/>
      </div>)
    }
    return (<div>Quiz Menu
      <br/>
      <button onClick={this.goBack}>Back to ProfilePage</button>
      <h3>Choose Category!</h3>
      <div className="categoryDiv">
        <br/>
        <button className="btnQuiz" onClick={this.fictionQuiz}>Fiction</button>
        <br/>
        <button className="btnQuiz" onClick={this.historyQuiz}>History</button>
        <br/>
        <button className="btnQuiz" onClick={this.sportQuiz}>Sport</button>
      </div>
      <div className="quizDiv">
        DETTA ÄR EN STOR GRÖN DIV</div>
    </div>)

  }
}

export default Quiz;
