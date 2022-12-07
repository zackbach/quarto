import React, { Component } from 'react';

class Piece extends Component {
    constructor(props) {
        super(props)
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick() {
        this.props.onSelect(this.props.pieceID);
    }
    
    render() {
        return (
            <img className="w-28"
                src={require('../assets/' + this.props.pieceID + '.png')} 
                alt={"A game piece with ID" + this.props.pieceID}
                width="180"
                onClick={this.handleClick}
            />
        );
    }
}

export default Piece;