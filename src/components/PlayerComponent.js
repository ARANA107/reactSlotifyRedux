import React, { Component } from 'react'

export default class PlayerComponent extends Component {
    constructor(props){
        super(props);
        this.state={
            count:0
        }
    }

    componentDidMount(){
        setInterval( ()=>{this.setState({count: this.state.count+1})}, 1000)
    }
    render() {
        const style={
                bottom: "0",
                position: "absolute",
                height: "23vh",
                width: "100%",
                backgroundColor: "blue",
                color:"white"
        }
        return (
            <div style={style}>
                {this.state.count}
            </div>
        )
    }
}
