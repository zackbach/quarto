import React, { Component } from 'react'
import Game from './components/Game'
import { HashRouter } from "react-router-dom";

class App extends Component {
    render() {
        return (
            <HashRouter base="/">
                <Game />
            </HashRouter>
        )
    }
}

export default App;
