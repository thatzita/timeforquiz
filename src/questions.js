import React, {Component} from 'react';
import Quiz from './quiz.js';

class Questions extends Component {
  constructor(props) {
    super(props)
    this.state = {
      clicked: true
    }
  }

  goBack = () => {
    console.log("hej")

    this.setState({clicked: false})
  }

  render() {

    if (!this.state.clicked) {
      return (<div>
        <Quiz profile={this.props.profile}/>
      </div>)
    }

    return (<div>QUESTIONS HERE
      <br/>
      <button onClick={this.goBack}>Back to Quiz Menu</button>
    </div>)

  }

}

export default Questions;
