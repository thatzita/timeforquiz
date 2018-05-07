import React, {Component} from 'react';
import firebase, {auth} from './firebase.js';
import ProfileComponent from './ProfileComponent.js';
import './App.css';

class Highscore extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: true,
      topPlayers: []
    }
  }
  goBack = () => {
    this.setState({clicked: false})
  }
  componentDidMount() {
    let highScoreList = [];
    firebase.database().ref('users/').once("value", snapshot => {
      snapshot.forEach(function(childSnapshot) {
        let childKey = childSnapshot.key;
        let childData = childSnapshot.val();
        let highScoreUser = {
          nickname: childData.profile.nickname,
          ranking: childData.profile.ranking
        }
        highScoreList.push(highScoreUser);
      })
      function compare(a, b) {
        if (a.ranking < b.ranking) 
          return -1;
        if (a.ranking > b.ranking) 
          return 1;
        return 0;
      }
      highScoreList.sort(compare);
      this.setState({topPlayers: highScoreList})
    });
  }
  render() {
    const profile = this.props.profile;
    let topTen = [];
    for (let i = 0; i < this.state.topPlayers.length; i++) {
      topTen.push(this.state.topPlayers[i])
    }

    if (!this.state.clicked) {
      return (<div>
        <ProfileComponent profile={profile}/>
      </div>)
    } else {
      return (<div>
        <ol className="topPlayers">
          {this.state.topPlayers.map(d => <li key={d.nickname}>{d.nickname}</li>)}
        </ol>
        <button onClick={this.goBack}>Back to ProfilePage</button>
      </div>)

    }
  }
}

export default Highscore
