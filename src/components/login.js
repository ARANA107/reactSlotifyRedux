import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { logInUser } from "../actions/fetchSongs";
import '../css/login.css';
class login extends Component {
  state = {
    isloggedin: false,
  };

  render() {
    if (this.state.isloggedin) {
      return <Redirect to="/maincomponent/albums" />;
    }
    const domain = "http://localhost:3000";
    return (
        
      <div>
        <div className="container-login100">
          <div className="wrap-login100 p-t-190 p-b-30">
            <form className="login100-form validate-form">
              <div className="login100-form-avatar">
                <img src={domain+"/images/avatar-01.jpg"} alt="AVATAR" />
              </div>

              <span className="login100-form-title p-t-20 p-b-45">
                ASH RANA
              </span>

              <div
                className="wrap-input100 validate-input m-b-10"
                data-validate="Username is required"
              >
                <input
                  className="input100"
                  type="text"
                  name="username"
                  placeholder="Username"
                  onChange={(e) =>
                    this.setState({ [e.target.name]: e.target.value })
                  }
                />
                <span className="focus-input100"></span>
                <span className="symbol-input100">
                  <i className="fa fa-user"></i>
                </span>
              </div>

              <div
                className="wrap-input100 validate-input m-b-10"
                data-validate="Password is required"
              >
                <input
                  className="input100"
                  type="password"
                  name="pass"
                  placeholder="Password"
                  onChange={(e) =>
                    this.setState({ [e.target.name]: e.target.value })
                  }
                />
                <span className="focus-input100"></span>
                <span className="symbol-input100">
                  <i className="fa fa-lock"></i>
                </span>
              </div>

              <div className="container-login100-form-btn p-t-10">
                <button
                  className="login100-form-btn"
                  type="button"
                  onClick={() => this.setState({ isloggedin: true })}
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logInUser: () => dispatch(logInUser()),
  };
};

const mapStatetoProps = ({ player }) => {
  return {
    player,
  };
};
export default connect(mapStatetoProps, mapDispatchToProps)(login);
