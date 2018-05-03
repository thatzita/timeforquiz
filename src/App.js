import React, {Component} from 'react';
import './App.css';
import firebase, {auth, provider, authfb} from './firebase.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      nickname: '',
      something: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.login = this.login.bind(this);
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
      user: null,
      nickname: this.state.nickname,
      something: this.state.something
    }
    userRef.push(currentUser);
    this.setState({nickname: '', something: ''});
  }
  logout() {
    auth.signOut()
  .then(() => {
    this.setState({
      user: null
    });
  });
  }
  login() {
    auth.signInWithPopup(provider)
    .then((result) => {
      console.log(result)
      const user = result.user;
      this.setState({user});
    })
  }

  loginFb(){
    auth.signInWithPopup(authfb)
    .then((result) =>{

      const user = result.user
      this.setState({user})
      console.log(this.state.user)

    })
  }
    render(){
      return (<div className="App">
        <div className="wrapper">
          <h1>Time For Quiz!</h1>
          {
            this.state.user
              ? <button className="btnGoogleLogout" onClick={this.logout}>Logout from Google</button>
              : <button className="btnGoogleLogin" onClick={this.login}>Login with Google</button>
          }
        </div>

        <button className="btnFb" onClick={this.loginFb}>Enter with facebook</button>
        <div className='container'>
          <section className='add-item'>
            <form onSubmit={this.handleSubmit}>
              <input type="text" name="nickname" placeholder="thatzita" onChange={this.handleChange} value={this.state.nickname}/>
              <input type="text" name="something" placeholder="that's it isn't it?" onChange={this.handleChange} value={this.state.something}/>
              <button >Add it</button>
            </form>
          </section>
        </div>
      </div>)
    }
  }



export default App
