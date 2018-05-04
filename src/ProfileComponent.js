import React, {Component} from 'react';

class ProfileComponent extends Component {
  constructor(props) {
    super(props)
    console.log(props)
  }

  componentWillMount(){

    console.log(this.props.profile.nickname)
  }
  render() {
    return (

      <div >

        <div className="profile">
        <img src={this.props.profile.picture + "?width=999"} />
        <h3>{this.props.profile.nickname}</h3>
        </div>


    </div>)
  }
}

export default ProfileComponent;
