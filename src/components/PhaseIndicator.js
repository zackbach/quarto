import React, { Component } from 'react';

class PhaseIndicator extends Component {
    render() {
        const p1p = this.props.playerOne && this.props.playing
        const p1s = this.props.playerOne && !this.props.playing
        const p2p = !this.props.playerOne && this.props.playing
        const p2s = !this.props.playerOne && !this.props.playing
        
        // maybe (probably) these should be their own components to cut down on duplication of code
        return (
            <div className="bg-red-500 rounded-md relative w-5/6 h-32 mx-auto">
                <div className='absolute left-0 top-5 w-5/12 min-w-fit rounded-r-full text-center bg-blue-500'>
                    <span className={"p-4 " + (p1p ? 'font-bold' : 'font-normal')}>Player One Plays</span>
                </div>
                <div className='absolute left-0 bottom-5 w-5/12 min-w-fit rounded-r-full text-center bg-blue-500'>
                    <span className={"p-4 " + (p1s ? 'font-bold' : 'font-normal')}>Player One Selects</span>
                </div>
                <div className='absolute right-0 top-5 w-5/12 min-w-fit rounded-l-full text-center bg-blue-500'>
                    <span className={"p-4 " + (p2p ? 'font-bold' : 'font-normal')}>Player Two Plays</span>
                </div>
                <div className='absolute right-0 bottom-5 w-5/12 min-w-fit rounded-l-full text-center bg-blue-500'>
                    <span className={"p-4 " + (p2s ? 'font-bold' : 'font-normal')}>Player Two Selects</span>
                </div>
            </div>
        );
    }
}

export default PhaseIndicator