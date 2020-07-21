import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import { connect } from 'react-redux'
import {logInUser} from '../actions/fetchSongs';

class login extends Component {
    render() {
        return (
            <div>
                this is login Component
                <Link to="/maincomponent/albums"><button>login</button></Link>
                <button onClick={()=>this.props.logInUser()}>Log In user</button> 
                {console.log(this.props.player.loggedIn)}
            </div>
        )
    }
}

const mapDispatchToProps=dispatch=>{
    return{
        logInUser: () => dispatch(logInUser())
    }
}

const mapStatetoProps = ({ player }) => {
    return {
      player,
    };
  };


export default connect(mapStatetoProps, mapDispatchToProps)(login)