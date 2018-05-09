import React, {Component} from 'react';
import firebase, {auth} from './firebase.js';
import ProfileComponent from './ProfileComponent.js';
import './App.css';

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
        // console.log(childKey)
        // console.log(childData)
        // if (childKey === self.props.firebaseKey) {
        //    console.log("found something")
        //   console.log(childData);
        //
        //   console.log(self.props.firebaseKey);
        //   console.log(self.state)
        //   self.setState({
        //     profile: {
        //       place: self.state.profile.place
        //     }
        //   })
        //   console.log(self.state)
        // }
        let highScoreUser = {
          nickname: childData.profile.nickname,
          ranking: childData.profile.ranking,
          // numberOfQuestions: childData.profile.numberOfQuestions
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
        <ol className="topPlayers">
          {topTen.map(d => <li key={d.nickname}>{d.nickname + " " + d.ranking}</li>)}
        </ol>
        <button onClick={this.goBack}>Back to ProfilePage</button>
      </div>)

    }
  }
}

export default Highscore
