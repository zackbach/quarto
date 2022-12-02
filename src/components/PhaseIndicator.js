import React, { Component } from 'react';

class PhaseIndicator extends Component {
    render() {
        return (
            <h1>It is {this.props.playerOne ? "Player One's " : "Player Two's "}
                turn to {this.props.playing ? "play" : "select"}</h1>
        );
    }
}

export default PhaseIndicator