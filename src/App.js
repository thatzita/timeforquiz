import React, {Component} from 'react';
import './App.css';
import firebase, {auth, provider, authfb} from './firebase.js';
import ProfileComponent from './ProfileComponent.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      nickname: '',
      email: '',
      uid: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.loginGoogle = this.loginGoogle.bind(this);
    this.logout = this.logout.bind(this);
    this.loginFb = this.loginFb.bind(this);
  }
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  handleSubmit(e) {
    e.preventDefault();
    const userRef = firebase.database().ref('users');
    const currentUser = {
      nickname: this.state.nickname,
      email: this.state.email
    }
    userRef.push(currentUser);
    this.setState({nickname: '', email: ''});
  }
  logout() {
    auth.signOut().then(() => {
      this.setState({user: null});
    });
  }
  loginGoogle() {
    auth.signInWithPopup(provider).then((result) => {
      const userRef = firebase.database().ref('users/');
      const user = result.user;
      let currentlyLoggedIn = firebase.auth().currentUser;

      let currentUser = {
        nickname: user.displayName,
        email: user.email,
        uid: user.uid
      }

      userRef.once("value", function(snapshot) {
        let data = snapshot.val();
        let keys = Object.keys(data);
        // console.log(data)
        // console.log(keys)
      });
      this.setState({user});
    })
  }
  loginFb() {
    auth.signInWithPopup(authfb).then((result) => {
      const userRef = firebase.database().ref('users/');
      const user = result.user;

      let currentlyLoggedIn = firebase.auth().currentUser;

      let currentUser = {
        nickname: user.displayName,
        email: user.email,
        uid: user.uid
      }

      userRef.once("value", function(snapshot) {
        let data = snapshot.val();
        let keys = Object.keys(data);
        console.log(data)
        console.log(keys)
      });

      this.setState({user})
      // console.log(this.state.user)
    })
  }
  render() {
    if (this.state.user !== null) {
      return (<div>
        <ProfileComponent/>
      </div>)
    }

    return (<div className="App">

      <div className="ruta"></div>

      <div className="info">
        <span>Time for quiz</span>

      </div>
      <div className="wrapper">
        <div>
          <i className="fab fa-google-plus-square btnFb" onClick={this.loginGoogle}></i>

          <i className="fab fa-facebook btnFb" onClick={this.loginFb}></i>
        </div>

      </div>

    </div>)
  }
}

export default App
