import React, {Component} from 'react';
import Quiz from './quiz.js';
import App from './App.js';
import Highscore from './Highscore.js';
import firebase, {auth} from './firebase.js';
import './ProfileComponent.css';

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
    console.log(this.state)
    console.log(this.props)
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
          place: this.props.profile.place,
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
          <button className="btn" onClick={this.startQuiz}>Click to start the quiz</button>
          <button className="btn" onClick={this.highscore}>Highscore</button>
          <div className="profile">
            <img src={profile.photo + "?width=999"}/>
            <input type="text" onChange={this.handleChange}/>
            <button className="btn" onClick={this.changeType}>Make the change</button>
            <h4>Stats</h4>
            <ul>
              <li>Place: {profile.place}</li>
              <li>Ranking: {profile.ranking}</li>
              <li>Correct answers: {profile.correctAnswers}</li>
              <li>Wrong answers: {profile.failedAnswers}</li>
            </ul>
            <button className="btn" onClick={this.logout}>Logout</button>
          </div>
        </div>)
      } else {
        return (<div>
          <button className="btn" onClick={this.startQuiz} profile={this.props.profile}>Click to start the quiz</button>
          <button className="btn" onClick={this.highscore}>Highscore</button>
          <div className="profile">
            <img src={profile.photo + "?width=999"}/>

            <h3 className="profileText">{this.state.nickname}</h3>
            <button onClick={this.changeType}>Edit</button>

            <h4>Stats</h4>
            <ul>
              <li>Place: {profile.place}</li>
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
