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
            <div className="proto-lock row end-xs bottom-xs middle-sm">
                <div className="col-xs-12 col-sm-9 last-xs">
                    <CommentaryTypeAhead isVisible={this.state.isLocked} />
                </div>
                <div className="col-xs-12 col-sm-3 last-sm">
                    <span onClick={() => this.toggleLock()}
                          className="proto-lock__label">
                                {lockLabel}
                            </span>
                    <span onClick={() => this.toggleLock()}
                          className={`proto-lock__icon fa ${this.state.isLocked ? 'fa-lock' : 'fa-unlock'}`}></span>
                </div>
            </div>
        )
    }
}