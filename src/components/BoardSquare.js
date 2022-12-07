import React, { Component } from 'react';
import Piece from './Piece';

class BoardSquare extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
    
    handleClick() {
        this.props.onPlace(this.props.row, this.props.col);
    }
    
    render() {
        return (
        <div className="aspect-square w-16 border-4 border-black" onClick={this.handleClick}>
            {this.props.pieceID !== null && <Piece pieceID={this.props.pieceID} handleClick={() => {}}/>}
        </div>
        );
    }
}

export default BoardSquare;