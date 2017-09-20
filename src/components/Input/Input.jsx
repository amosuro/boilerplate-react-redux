import React from 'react';

import url from './Input.scss';

export default class Input extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="input">
                <input className="input__field"
                       onChange={(event) => this.props.onChange(event, this.props.name)}
                       placeholder={this.props.placeholder}
                       type={this.props.type} />
            </div>
        )
    }
}