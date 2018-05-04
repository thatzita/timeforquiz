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
        
        this.setState({
        clicked: false
        
      })
    
    }
  render() {
      
      if(!this.state.clicked) {
          return (
              <div>
                  <Quiz/>
              </div>
        )
      }
      return (
        <div>This will be starting page
              <button onClick={ this.startQuiz}>Click to start the quiz</button>
        </div>
        
        
    )
            
  }
}

export default ProfileComponent;
