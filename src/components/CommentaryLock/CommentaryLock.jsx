import React from 'react';

import url from './CommentaryLock.scss';

import CommentaryTypeAhead from '../CommentaryTypeAhead/CommentaryTypeAhead';

export default class CommentaryLock extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLocked: false
        }
    }

    toggleLock() {
        this.setState({
            isLocked: !this.state.isLocked
        });
    }

    render() {
        const lockLabel = this.state.isLocked ? 'Private' : 'Public';

        return (
            <div className="proto-lock">
                <CommentaryTypeAhead isVisible={this.state.isLocked} />
                <div onClick={() => this.toggleLock()}
                     className="proto-lock__label">
                    {lockLabel}
                </div>
                <div onClick={() => this.toggleLock()}
                     className={`proto-lock__icon fa ${this.state.isLocked ? 'fa-lock' : 'fa-unlock'}`}></div>
            </div>
        )
    }
}