import React, {Component} from 'react';
import './quiz.css';
import './App.css';
import ProfileComponent from './ProfileComponent.js';
import Questions from './questions.js';
import SportQuestions from './sportQuestions.js';

class Quiz extends Component {
  constructor(props) {
    super(props)
    this.state = {
      clicked: true,
//      clickedQuiz: true,
      clickedSport: true
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
    this.setState({clickedSport: false})
  }

  render() {
    const profile = this.props.profile;
    console.log(profile)
    if (!this.state.clicked) {
      return (<div>
        <ProfileComponent profile={profile}/>
      </div>)
    }

//    if (!this.state.clickedQuiz) {
//      return (<div>
//        <Questions profile={profile}/>
//      </div>)
//    }

     if (!this.state.clickedSport) {
      return (<div>
        <SportQuestions firebaseKey={this.props.firebaseKey} profile={profile}/>
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
      <div className="profile">
        <img src={profile.photo + "?width=999"}/>
        <h3>{profile.nickname}</h3>
      </div>
    </div>)

  }
}

export default Quiz;
