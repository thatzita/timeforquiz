import React, {Component} from 'react';
import './App.css';
import firebase, {auth, provider, authfb} from './firebase.js';

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
        // console.log(keys)
        // console.log(data)

      });
      this.setState({user});
    })
  }
  loginFb() {
    auth.signInWithPopup(authfb).then((result) => {
      console.log(result)
    })
  }
  render() {
    return (<div className="App">
      <div className="wrapper">
        <h1>Johan is love, Johan is life</h1>
        {
          this.state.user
            ? <button onClick={this.logout}>Leave Johan</button>
            : <button onClick={this.loginGoogle}>Enter Johan</button>
        }
        {
          this.state.user
            ? <button onClick={this.logout}>Leave facebook</button>
            : <button onClick={this.loginFb}>Enter with facebook</button>
        }
      </div>
      <div className='container'>
        <section className='add-item'>
          <form onSubmit={this.handleSubmit}>
            <input type="text" name="nickname" placeholder="thatzita" onChange={this.handleChange} value={this.state.nickname}/>
            <input type="text" name="email" placeholder="that's it isn't it?" onChange={this.handleChange} value={this.state.email}/>
            <button >Add it</button>
          </form>
        </section>
      </div>
    </div>)
  }
}

export default App
