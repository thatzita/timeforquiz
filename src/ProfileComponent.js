import React, {Component} from 'react';
import Quiz from './quiz.js';
import App from './App.js';
import Highscore from './Highscore.js';
import firebase, {auth} from './firebase.js';

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
    console.log(this.state)
    console.log(this.props)

    // let signOut = false;
    this.logout = this.logout.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  logout = () => {
    // this.signOut = true;
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
    // console.log(firebase.auth().currentUser.uid)
    // console.log(this.props.firebaseKey)
    let userId = this.props.firebaseKey
    // console.log(this.state)
    if (this.state.inputField === false) {
      // console.log("on")
      this.setState({inputField: true})
    } else {
      // console.log("off")
      this.setState({inputField: false})
      firebase.database().ref('users/' + userId).set({
        profile: {
          nickname: this.state.nickname,
          // mail: this.props.profile.mail,
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
    // this.signOut;
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
          <button onClick={this.startQuiz}>Click to start the quiz</button>
          <button onClick={this.highscore}>Highscore</button>
          <div className="profile">
            <img src={profile.photo + "?width=999"}/>
            <input type="text" onChange={this.handleChange}/>
            <button onClick={this.changeType}>Make the change</button>
            <h4>Stats</h4>
            <ul>
              <li>Place: {profile.place}</li>
              <li>Ranking: {profile.ranking}</li>
              <li>Correct answers: {profile.correctAnswers}</li>
              <li>Wrong answers: {profile.failedAnswers}</li>
            </ul>
            <button onClick={this.logout}>Logout</button>
          </div>
        </div>)
      } else {
        return (<div>
          <button onClick={this.startQuiz}>Click to start the quiz</button>
          <button onClick={this.highscore}>Highscore</button>
          <div className="profile">
            <img src={profile.photo + "?width=999"}/>
            <h3>{this.state.nickname}</h3>
            <button onClick={this.changeType}>Edit</button>
            <h4>Stats</h4>
            <ul>
              <li>Place: {profile.place}</li>
              <li>Ranking: {profile.ranking}</li>
              <li>Correct answers: {profile.correctAnswers}</li>
              <li>Wrong answers: {profile.failedAnswers}</li>
            </ul>
            <button onClick={this.logout}>Logout</button>
          </div>
        </div>)
      }
    }
  }
}

export default ProfileComponent;
