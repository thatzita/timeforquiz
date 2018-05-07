import React, {Component} from 'react';
import Quiz from './quiz.js';
import App from './App.js';
import firebase, {auth} from './firebase.js';

class ProfileComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      clicked: true,
      profile: {
        loggedIn: true
      }
    }
    // let signOut = false;
    this.logout = this.logout.bind(this);
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
  render() {
    // this.signOut;
    const profile = this.props.profile;
    console.log(this.state.profile.loggedIn)
    if (!this.state.clicked) {
      return (<div>
        <Quiz profile={profile}/>
      </div>)
    } else if (!this.state.profile.loggedIn) {
      return (<div>
        <App profile={profile}/>
      </div>)
    } else {
      return (<div>
        <button onClick={this.startQuiz}>Click to start the quiz</button>
        <div className="profile">
          <img src={profile.photo + "?width=999"}/>
          <h3>{profile.nickname}</h3>
          <h4>Stats</h4>
          <ul>
            <li>Correct answers: {profile.correctAnswers}</li>
            <li>Wrong answers: {profile.failedAnswers}</li>
          </ul>
          <button onClick={this.logout}>Logout</button>
        </div>
      </div>)
    }

  }
}

export default ProfileComponent;
