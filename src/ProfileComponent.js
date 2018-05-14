import React, {Component} from 'react';
import Quiz from './quiz.js';
import App from './App.js';
import Highscore from './Highscore.js';
import firebase, {auth} from './firebase.js';
import './ProfileComponent.css';
import "./App.css"
class ProfileComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      clicked: true,
      score: true,
      inputField: false,
      profile: {
        loggedIn: true
      },
      nickname: this.props.nickname
    }
    this.logout = this.logout.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  logout = () => {
    auth.signOut().then(() => {
      this.setState({
        profile: {
          user: null,
          loggedIn: false
        }
      });
    });
  }
  startQuiz = () => {
    this.setState({clicked: false})
  }
  highscore = () => {
    this.setState({score: false})
  }
  changeType = () => {
    let userId = this.props.firebaseKey
    if (this.state.inputField === false) {
      this.setState({inputField: true})
    } else {
      this.setState({inputField: false})
      firebase.database().ref('users/' + userId).set({
        profile: {
          nickname: this.state.nickname,
          uid: this.props.profile.uid,
          photo: this.props.profile.photo,
          // place: this.props.profile.place,
          correctAnswers: this.props.profile.correctAnswers,
          failedAnswers: this.props.profile.failedAnswers,
          ranking: this.props.profile.ranking
        }
      });
    }
  }
  handleChange(e) {
    this.setState({nickname: e.target.value})

  }
  render() {
    const profile = this.props.profile;
    const list = this.props.list;
    if (!this.state.clicked) {
      return (<div>
        <Quiz profile={profile} nickname={this.state.nickname} firebaseKey={this.props.firebaseKey}/>
      </div>)
    } else if (!this.state.profile.loggedIn) {
      return (<div>
        <App profile={profile}/>
      </div>)
    } else if (!this.state.score) {
      return (<div>
        <Highscore profile={profile} list={list} firebaseKey={this.props.firebaseKey} nickname={this.state.nickname}/>
      </div>)
    } else {
      if (this.state.inputField === true) {
        return (<div>
          <div className="buttons">
            <button className="btn" onClick={this.startQuiz}>Click to start the quiz</button>
            <button className="btn" onClick={this.highscore}>Highscore</button>
          </div>
          <div className="profile">
            <img src={profile.photo + "?width=999"} alt=" "/>
            <input type="text" onChange={this.handleChange}/>
            <i className="fas fa-pencil-alt btnEdit" onClick={this.changeType}></i>
            <h4>Stats</h4>
            <ul>
              <li>Ranking: {profile.ranking}</li>
              <li>Correct answers: {profile.correctAnswers}</li>
              <li>Wrong answers: {profile.failedAnswers}</li>
            </ul>
            <button className="logout" onClick={this.logout}>Logout</button>
          </div>
        </div>)
      } else {
        return (<div>
          <div className="buttons">
            <button className="btn" onClick={this.startQuiz} profile={this.props.profile}>Click to start the quiz</button>
            <button className="btn" onClick={this.highscore}>Highscore</button>
          </div>
          <div className="profile">
            <img src={profile.photo + "?width=999"} alt=" "/>

            <h3 className="profileText">{this.state.nickname}</h3>
            <i className="fas fa-pencil-alt btnEdit" onClick={this.changeType}></i>

            <h4>Stats</h4>
            <ul>
              <li>Ranking: {profile.ranking}</li>
              <li>Correct answers: {profile.correctAnswers}</li>
              <li>Wrong answers: {profile.failedAnswers}</li>
            </ul>
            <button className="logout" onClick={this.logout}>Logout</button>

          </div>
        </div>)
      }
    }
  }
}

export default ProfileComponent;
// <li>Place: {profile.place}</li>
// <li>Place: {profile.place}</li>
