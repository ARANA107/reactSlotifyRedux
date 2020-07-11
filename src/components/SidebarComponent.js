import React, { Component } from 'react'

export default class SideBarComponent extends Component {
    render() {

        const sidebar={
            float: "left",
            height: "80vh",
            width: "20vh",
            backgroundColor: "black",
        }
        return (
            <div style={sidebar}>
                SIDEBAR
            </div>
        )
    }
}
