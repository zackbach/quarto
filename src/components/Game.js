import React, { Component } from 'react';
import PhaseIndicator from './PhaseIndicator';
import Gameboard from './Gameboard';
import RemainingPieces from './RemainingPieces';
import Piece from './Piece';

class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            board: [[null, null, null, null], 
                    [null, null, null, null], 
                    [null, null, null, null], 
                    [null, null, null, null]],
            selected: null,
            showSelected: true,
            playerOne: true,
            playing: false,
            hasWon: false,
        }
        this.nextPhase = this.nextPhase.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.clickSelected = this.clickSelected.bind(this);
        this.handlePlace = this.handlePlace.bind(this);
        this.newGame = this.newGame.bind(this);
    }

    checkWin() {
        const LINES = [[[0, 0], [0, 1], [0, 2], [0, 3]],
                       [[1, 0], [1, 1], [1, 2], [1, 3]],
                       [[2, 0], [2, 1], [2, 2], [2, 3]],
                       [[3, 0], [3, 1], [3, 2], [3, 3]],
                       [[0, 0], [1, 0], [2, 0], [3, 0]],
                       [[0, 1], [1, 1], [2, 1], [3, 1]],
                       [[0, 2], [1, 2], [2, 2], [3, 2]],
                       [[0, 3], [1, 3], [2, 3], [3, 3]],
                       [[0, 0], [1, 1], [2, 2], [3, 3]],
                       [[3, 0], [2, 1], [1, 2], [0, 3]]];
        for (let i = 0; i < LINES.length; i++) {
            const boardPieces = this.getPieces(LINES[i]);
            if (!boardPieces.includes(null)) {
                if ((boardPieces[0] & boardPieces[1] & boardPieces[1] & boardPieces[2]) !== 0 ||
                    ((boardPieces[0]^15) & (boardPieces[1]^15) & (boardPieces[2]^15) & (boardPieces[3]^15)) !== 0) {
                        return true;
                    }
            }
        }
        return false;
    }

    getPieces(squares) {
        let r = [];
        for (let i = 0; i < squares.length; i++) {
            r.push(this.state.board[squares[i][0]][squares[i][1]]);
        }
        return r;
    }

    nextPhase() {
        if (this.state.playing && !this.state.showSelected) {
            this.setState({hasWon: this.checkWin(), playing: false});
        } else if (!this.state.playing && this.state.selected !== null) {
            this.setState(prevState => ({
                playerOne: !prevState.playerOne,
                playing: true,
            }));
        }
    }

    getRemaining() {
        const seen = new Set();
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                seen.add(this.state.board[i][j]);
            }
        }
        if (this.state.selected !== null) {
            seen.add(this.state.selected)
        }
        let r = [];
        for (let n = 0; n < 16; n++) {
            if (!seen.has(n)) {
                r.push(n);
            }
        }
        return r;
    }
    
    handleSelect(id) {
        if (!this.state.playing) {
            this.setState({selected: id, showSelected: true});
        }
    }

    removeSelected() {
        let newBoard = [[null, null, null, null], 
                        [null, null, null, null], 
                        [null, null, null, null], 
                        [null, null, null, null]]
        
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                if(this.state.board[i][j] === this.state.selected) {
                    newBoard[i][j] = null;
                } else {
                    newBoard[i][j] = this.state.board[i][j];
                }
            }
        }
        this.setState({board: newBoard})
    }

    clickSelected() {
        if (!this.state.playing) {
            this.setState({selected: null})
        } else if (!this.state.showSelected) {
            this.removeSelected();
            this.setState({showSelected: true});
        }
    }

    handlePlace(x, y) {
        if (!this.state.playing) {
            return
        }
        
        let newBoard = [[null, null, null, null], 
                        [null, null, null, null], 
                        [null, null, null, null], 
                        [null, null, null, null]]
        
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                if(this.state.board[i][j] === this.state.selected) {
                    newBoard[i][j] = null;
                } else if (i === x && j === y) {
                    newBoard[i][j] = this.state.selected;
                } else {
                    newBoard[i][j] = this.state.board[i][j];
                }
            }
        }
        this.setState({board: newBoard, showSelected: false})
    }

    newGame() {
        this.setState({
            board: [[null, null, null, null], 
                    [null, null, null, null], 
                    [null, null, null, null], 
                    [null, null, null, null]],
            selected: null,
            showSelected: true,
            playerOne: true,
            playing: false,
            hasWon: false,
        });
    }

    render() {
        if (this.state.hasWon) {
            return (
                <div>
                    <h1>{this.state.playerOne ? "Player One Wins!" : "Player Two Wins!"}</h1>
                    <button onClick={this.newGame}>Play again?</button>
                </div>
            );
        }
        return (
            <div className="flex justify-center">
                <div className="w-full md:w-2/3 flex flex-col justify-center mt-8">
                    <PhaseIndicator playerOne={this.state.playerOne} playing={this.state.playing}/>
                    <button onClick={this.nextPhase}>Submit</button>
                    <div className="aspect-square w-16 border-4 border-black" onClick={this.clickSelected}>
                        {this.state.selected !== null && this.state.showSelected &&
                        <Piece onSelect={() => {}} pieceID={this.state.selected}/>}
                    </div>
                    <Gameboard board={this.state.board} onPlace={this.handlePlace}/>
                    <RemainingPieces pieces={this.getRemaining()} onSelect={this.handleSelect}/>
                </div>
            </div>
        );
    }
}

export default Game;