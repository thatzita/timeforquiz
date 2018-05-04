import React, {Component} from 'react';

class ProfileComponent extends Component {
  constructor(props) {
    super(props)
    console.log(props)
  }
  render() {
    return (<div><img src={this.props.profile.photo}/></div>)
  }
}

export default ProfileComponent;
