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
    this.logout = this.logout.bind(this);
    this.loginFb = this.loginFb.bind(this);
  }
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  logout() {
    auth.signOut().then(() => {
      this.setState({
        profile: {
          user: null
        }

      });

    });
  }
  loginGoogle() {
    auth.signInWithPopup(provider).then((result) => {
      const userRef = firebase.database().ref('users/');
      const user = result.user;
      let currentlyLoggedIn = firebase.auth().currentUser;

      console.log(user)
      let currentUser = {
        profile: {
          nickname: user.displayName,
          mail: user.email,
          uid: user.uid,
          loggedIn:true,
          picture: user.photoURL
        },


      }

      userRef.once("value", function(snapshot) {
        let data = snapshot.val();
        let keys = Object.keys(data);
        // console.log(data)
        // console.log(keys)
      });
      this.setState({
        profile: {
          nickname: user.displayName,
          mail: user.email,
          uid: user.uid,
          loggedIn: true,
          picture: user.photoURL

        }
      });
    })
  }
  loginFb() {
    auth.signInWithPopup(authfb).then((result) => {
      const userRef = firebase.database().ref('users/');
      const user = result.user;

      for(let us in userRef){

        console.log(us)
      }
      let currentlyLoggedIn = firebase.auth().currentUser;
      let currentUser = {
        profile: {
          nickname: user.displayName,
            mail: user.email,
            uid: user.uid,
            loggedIn:true,
            picture : user.photoURL

        }
      }

      userRef.once("value", function(snapshot) {
        let data = snapshot.val();
        let keys = Object.keys(data);
        console.log(data)
        console.log(keys)
      });

      this.setState({
        profile: {
          nickname: user.displayName,
            mail: user.email,
            uid: user.uid,
            loggedIn:true,
            picture : user.photoURL
        }
      });
    })
  }

  componentWillMount(){
    console.log(this.state.profile)
  }
  render() {
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
