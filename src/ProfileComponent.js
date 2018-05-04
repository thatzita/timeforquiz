import React, {Component} from 'react';
import Quiz from './quiz.js';

class ProfileComponent extends Component {
  constructor(props) {
    super(props)

    this.state = {
      clicked: true
    }
  }

  startQuiz = () => {
    this.setState({clicked: false})
  }
  render() {

    if (!this.state.clicked) {
      return (<div>
        <Quiz profile={this.props.profile}/>
      </div>)
    }
    return (<div>
      <button onClick={this.startQuiz}>Click to start the quiz</button>

      <div className="profile">
        <img src={this.props.profile.photo + "?width=999"}/>
        <h3>{this.props.profile.nickname}</h3>

      </div>
    </div>)

  }
}

export default ProfileComponent;
