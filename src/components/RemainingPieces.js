import React, { Component } from 'react';
import Piece from './Piece';

class RemainingPieces extends Component {
    
    render() {
        const pieces = this.props.pieces
        return (
            <div>
                { pieces.map((n) => <Piece key={n.toString()} pieceID={n} onSelect={this.props.onSelect}/>) }
            </div>
        );
    }
}

export default RemainingPieces;