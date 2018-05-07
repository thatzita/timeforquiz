import React, {Component} from 'react';
import './App.css';
import firebase, {auth, provider, authfb} from './firebase.js';
import ProfileComponent from './ProfileComponent.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: {
        user: null,
        nickname: '',
        email: '',
        uid: '',
        loggedIn: false,
        picture: "",
        correctAnswers: 0,
        failedAnswers: 0,
        ranking: 0
      }
    }
    this.handleChange = this.handleChange.bind(this);
    this.loginGoogle = this.loginGoogle.bind(this);
    this.loginFb = this.loginFb.bind(this);
    // this.updateVal = this.updateVal.bind(this)
  }
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  loginGoogle() {
    const self = this;

    auth.signInWithPopup(provider).then((result) => {
      const user = result.user;
      const userRef = firebase.database().ref('users/');
      // let existingUsers = [];
      let doesItNotExist = true;

      console.log(user)
      let currentUser = {
        profile: {
          nickname: user.displayName,
          mail: user.email,
          uid: user.uid,
          photo: user.photoURL,
          correctAnswers: 0,
          failedAnswers: 0,
          ranking: 0
        }
      };

      userRef.once("value", function(snapshot) {
        let data = snapshot.val();
        if (data === null) {
          userRef.push(currentUser)

        } else {
          let keys = Object.keys(data);
          for (let key in data) {
            if (data[key].profile.uid === user.uid) {
              console.log(data[key].profile)
              currentUser = {
                profile: {
                  nickname: data[key].profile.nickname,
                  mail: data[key].profile.mail,
                  uid: data[key].profile.uid,
                  photo: data[key].profile.photo,
                  correctAnswers: data[key].profile.correctAnswers,
                  failedAnswers: data[key].profile.failedAnswers,
                  ranking: data[key].profile.ranking
                }
              }
              doesItNotExist = false;
              break;
            }
          }

          if (doesItNotExist) {
            console.log("user does not exist")
            userRef.push(currentUser)

          } else {}

        }

        updateVal()
      }) //userReef.once

      //this
      function updateVal() {

        //this fel
        console.log(this)

        self.setState({
          profile: {
            nickname: currentUser.profile.nickname,
            mail: currentUser.profile.mail,
            uid: currentUser.profile.uid,
            photo: currentUser.profile.photo,
            loggedIn: true,
            correctAnswers: currentUser.profile.correctAnswers,
            failedAnswers: currentUser.profile.failedAnswers,
            ranking: currentUser.profile.ranking
          }
        });
      }

      console.log("self ", self)

    }) //signInWithPopup
  } //loginGoogle

  loginFb() {
    const self = this;
    auth.signInWithPopup(authfb).then((result) => {
      const user = result.user;
      const userRef = firebase.database().ref('users/');
      // let existingUsers = [];
      let doesItNotExist = true;

      console.log(user)
      let currentUser = {
        profile: {
          nickname: user.displayName,
          mail: user.email,
          uid: user.uid,
          photo: user.photoURL,
          correctAnswers: 0,
          failedAnswers: 0,
          ranking: 0
        }
      };

      userRef.once("value", function(snapshot) {
        let data = snapshot.val();
        if (data === null) {
          userRef.push(currentUser)

        } else {
          let keys = Object.keys(data);
          for (let key in data) {
            if (data[key].profile.uid === user.uid) {
              console.log(data[key].profile)
              currentUser = {
                profile: {
                  nickname: data[key].profile.nickname,
                  mail: data[key].profile.mail,
                  uid: data[key].profile.uid,
                  photo: data[key].profile.photo,
                  correctAnswers: data[key].profile.correctAnswers,
                  failedAnswers: data[key].profile.failedAnswers,
                  ranking: data[key].profile.ranking
                }
              }
              doesItNotExist = false;
              break;
            }
          }

          if (doesItNotExist) {
            console.log("user does not exist")
            userRef.push(currentUser)

          } else {}

        }

        updateVal()
      }) //userReef.once

      //this
      function updateVal() {

        //this fel
        console.log(this)

        self.setState({
          profile: {
            nickname: currentUser.profile.nickname,
            mail: currentUser.profile.mail,
            uid: currentUser.profile.uid,
            photo: currentUser.profile.photo,
            loggedIn: true,
            correctAnswers: currentUser.profile.correctAnswers,
            failedAnswers: currentUser.profile.failedAnswers,
            ranking: currentUser.profile.ranking
          }
        });
      }

      console.log("self ", self)

    })
  }
  render() {
    // const profile = this.props.profile;

    if (this.state.profile.loggedIn !== false) {
      return (<div>
        <ProfileComponent profile={this.state.profile}/>
      </div>)
    }
    return (<div className="App">
      <div className="ruta"></div>
      <div className="info">
        <span>Time for quiz</span>
      </div>
      <div className="wrapper"></div>
      <div className="socialamedierLogIn">
        <i className="fab fa-google-plus-square btnFb" onClick={this.loginGoogle}></i>
        <i className="fab fa-facebook btnFb" onClick={this.loginFb}></i>
      </div>
    </div>)
  }
}

export default App
