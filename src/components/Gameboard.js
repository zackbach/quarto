import React, { Component } from 'react';
import BoardSquare from './BoardSquare';

class Gameboard extends Component {
    render() {
        return (
            <div>
                {this.props.board.map((row, r) => {
                    return (
                        <div key={r.toString()} className="flex flex-row">
                            {row.map((col, c) => {
                                return <BoardSquare 
                                            key={c.toString()} row={r} col={c} 
                                            pieceID={this.props.board[r][c]}
                                            onPlace={this.props.onPlace}
                                        />;
                            })}
                        </div>
                    );
                })}
            </div>
        );
    }
}

export default Gameboard;