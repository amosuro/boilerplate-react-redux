import React from 'react';
import PropTypes from 'prop-types';

export default class NavigationItem extends React.Component {
    render() {
        const style = {
            cursor: 'pointer',
            display: 'inline',
            padding: '5px',
            background: '#ccc',
            margin: '0 5px 0 0'
        };

        return (
            <li style={style} onClick={this.props.onClick}>
                {this.props.name} {this.props.active ? ' (active)' : ''}
            </li>
        );
    }
}

NavigationItem.propTypes = {
    name: PropTypes.string.isRequired,
    active: PropTypes.bool
};