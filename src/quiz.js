import React, {Component} from 'react';
import './quiz.css';
import './App.css';
import ProfileComponent from './ProfileComponent.js';
import Questions from './questions.js';
import SportQuestions from './sportQuestions.js';
import FictionQuestions from './FictionQuestions.js';
import HistoryQuestions from "./historyQuestions.js"

class Quiz extends Component {
  constructor(props) {
    super(props)
    this.state = {
      clicked: true,
      clickedSport: true,
      clickedFiction: true,
      clickedHistory:true,
      nickname: this.props.nickname,
      key: this.props.firebaseKey
    }

  }

  goBack = () => {
    this.setState({clicked: false})
  }

  fictionQuiz = () => {
    console.log("this is a quiz about fiction");
    this.setState({clickedFiction: false})
  }

  historyQuiz = () => {
    console.log("this is a quiz a bout history");
    this.setState({clickedHistory: false})
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
        <ProfileComponent profile={profile} nickname={this.state.nickname} firebaseKey={this.props.firebaseKey}/>
      </div>)
    }


    if (!this.state.clickedSport) {
      return (<div>
        <SportQuestions firebaseKey={this.props.firebaseKey} profile={profile} nickname={this.state.nickname}/>
      </div>)
    }
    if (!this.state.clickedFiction) {
      return (<div>
        <FictionQuestions firebaseKey={this.props.firebaseKey} profile={profile} nickname={this.state.nickname}/>
      </div>)
    }
    if(!this.state.clickedHistory){
      return (<div>
        <HistoryQuestions firebaseKey={this.props.firebaseKey} profile={profile} nickname={this.state.nickname}/>
      </div>)
    }
    return (<div>Quiz Menu
      <br/>
      <button onClick={this.goBack} profile={this.props.profile}>Back to ProfilePage</button>
      <h3>Choose Category!</h3>
      <div className="categoryDiv">
        <br/>
        <button className="btnQuiz" onClick={this.fictionQuiz}  profile={profile}>Fiction</button>
        <br/>
        <button className="btnQuiz" onClick={this.historyQuiz}  profile={profile}>History</button>
        <br/>
        <button className="btnQuiz" onClick={this.sportQuiz}  profile={profile}>Sport</button>
      </div>
      <div className="profile">
        <img src={profile.photo + "?width=999"}/>
        <h3>{this.state.nickname}</h3>
      </div>
    </div>)

  }
}

export default Quiz;
