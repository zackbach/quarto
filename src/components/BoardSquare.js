import React, { Component } from 'react';

class BoardSquare extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
    
    handleClick() {
        this.props.onPlace(this.props.row, this.props.col);
    }
    
    render() {
        return <button onClick={this.handleClick}>{this.props.pieceID}</button>
    }
}

export default BoardSquare;