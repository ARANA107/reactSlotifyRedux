import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import {Domain} from '../domainName';
import "../css/sideBar.css";

export class SidebarComponent extends Component {
  render() {


    return (
      <div className="sideMain">
        <nav className="navBar">
          <div className="logo">
            <img src={Domain + "icons/logo.png"} alt="logo" />
          </div>
          <div className="group">
            <div className="navItem">
              <div className="navItemLink"> <Link to={`/Search`}>Search</Link>
                <img src={Domain + "icons/search.png"} className="icon" alt="Search" />
              </div>
            </div>
            <div className="navItem">
              <div className="navItemLink"> <Link to={`/Search`}>Logout</Link>
              </div>
            </div>
          </div>
        </nav>
      </div>

    )
  }
}
