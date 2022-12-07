import React, { Component } from 'react';
import PhaseIndicator from './PhaseIndicator';
import Gameboard from './Gameboard';
import RemainingPieces from './RemainingPieces';

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
        }
        this.nextPhase = this.nextPhase.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
    }

    nextPhase() {
        if (this.state.playing && !this.state.showSelected) {
            // check for win here?
            this.setState({playing: false});
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
        this.setState({selected: id})
    }

    render() {
        return (
            <div>
                <PhaseIndicator playerOne={this.state.playerOne} playing={this.state.playing}/>
                <button onClick={this.nextPhase}>Submit</button>
                <Gameboard board={this.state.board} />
                <RemainingPieces pieces={this.getRemaining()} onSelect={this.handleSelect}/>
            </div>
        );
    }
}

export default Game;