import React, {Component} from 'react';
import firebase, {auth} from './firebase.js';
import ProfileComponent from './ProfileComponent.js';
import './Highscore.css';

class Highscore extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: true,
      topPlayers: '',
      key: this.props.firebaseKey,
      // profile: {
      //   place: this.props.place
      // }
    }
    console.log(this.state)
    console.log(this.props)
  }
  goBack = () => {
    this.setState({clicked: false})
  }
  componentDidMount() {
    console.log(this.props.list)
    let highScoreList = [];
    firebase.database().ref('users/').on("value", snapshot => {
      console.log(snapshot.val())
      let self = this;
      snapshot.forEach(function(childSnapshot) {
        console.log(self.props.firebaseKey)
        let childKey = childSnapshot.key;
        let childData = childSnapshot.val();
        let highScoreUser = {
          nickname: childData.profile.nickname,
          ranking: childData.profile.ranking,
        }
        highScoreList.push(highScoreUser);
        console.log(highScoreUser)
      })
      function compare(a, b) {
        if (a.ranking < b.ranking)
          return -1;
        if (a.ranking > b.ranking)
          return 1;
        return 0;
      }
      console.log(highScoreList)
      highScoreList.sort(compare);
      highScoreList.reverse()
      this.setState({topPlayers: highScoreList})
      // console.log(this.state.topPlayers)
    });

  }
  render() {
    const profile = this.props.profile;
    console.log(this.props)
    console.log(this.state)
    let topTen = [];
    for (let i = 0; i < this.state.topPlayers.length; i++) {
      topTen.push(this.state.topPlayers[i])
    }
    // topTen.reverse();
    if (!this.state.clicked) {
      return (<div>
        <ProfileComponent profile={profile} list={this.state.topPlayers} firebaseKey={this.props.firebaseKey} nickname={this.props.nickname}/>
      </div>)
    } else {
      return (<div>
        <div className="container">
        <h1>Top players</h1>
        </div>
        <div className="container">
        <ol className="topPlayers">
          {topTen.map(d => <li key={d.nickname}>{d.nickname + " " + d.ranking + "%"}</li>)}
        </ol>
        </div>
        <div className="container">
        <button className="btn" onClick={this.goBack}>Back to ProfilePage</button>
        </div>
      </div>)

    }
  }
}

export default Highscore;
