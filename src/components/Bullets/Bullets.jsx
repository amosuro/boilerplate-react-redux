import React from 'react';

import url from './Bullets.scss';

export default class Bullets extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const bullets = this.props.bullets.map((bullet, idx) => {
            const className = idx === 0 ? 'proto-bullets__bullet proto-bullets__bullet--first' : 'proto-bullets__bullet';

            return (
                <li key={idx} className={className}>
                    <div className="proto-bullets__bullet__remove">
                        <div className="proto-bullets__bullet__remove-icon fa fa-minus-square"
                             onClick={() => this.props.remove(bullet.id)}></div>
                    </div>
                    <input type="text"
                           placeholder="Add a rationale..."
                           onChange={(e) => this.props.update(bullet.id, e)}
                           value={bullet.label}
                           className="proto-bullets__bullet__label" />
                 </li>
            );
        });

        return (
            <div className="proto-bullets">
                {bullets}
                <div className="proto-bullets__new" onClick={() => this.props.addNew()}>
                    <div className="proto-bullets__new-icon fa fa-plus-square"></div>
                    <div className="proto-bullets__new-label">Add</div>
                </div>
            </div>
        )
    }
}