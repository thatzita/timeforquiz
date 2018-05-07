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
        picture: ""
      }
    }
    this.handleChange = this.handleChange.bind(this);
    this.loginGoogle = this.loginGoogle.bind(this);
    this.loginFb = this.loginFb.bind(this);
  }
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  loginGoogle() {
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

          photo: user.photoURL
        }
      };

      this.setState({
        profile: {
          nickname: user.displayName,
          mail: user.email,
          uid: user.uid,
          photo: user.photoURL,
          loggedIn: true
        }
      });

      userRef.once("value", function(snapshot) {
        let data = snapshot.val();
        let keys = Object.keys(data);

        for (let key in data) {
          if (data[key].profile.uid === user.uid) {
            doesItNotExist = false;
            break;
          }
        }

        if (doesItNotExist) {
          console.log("user does not exist")
          userRef.push(currentUser)

        }
      });

    })
  }
  loginFb() {
    auth.signInWithPopup(authfb).then((result) => {
      const user = result.user;

      const userRef = firebase.database().ref('users/');
      // let existingUsers = [];
      let doesItNotExist = true;

      let currentlyLoggedIn = firebase.auth().currentUser;
      let currentUser = {
        profile: {
          nickname: user.displayName,
          mail: user.email,
          uid: user.uid,
          photo: user.photoURL
        }
      };

      this.setState({
        profile: {
          nickname: user.displayName,
          mail: user.email,
          uid: user.uid,
          photo: user.photoURL,
          loggedIn: true
        }
      });

      userRef.once("value", function(snapshot) {
        let data = snapshot.val();
        let keys = Object.keys(data);
        for (let key in data) {
          if (data[key].profile.uid === user.uid) {
            console.log(this.state.profile.loggedIn)
            doesItNotExist = false;
            break;
          }
        }
        if (doesItNotExist) {
          console.log("user does not exist")
          userRef.push(currentUser)
        }
      });

    })
  }

  componentWillMount() {}
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
