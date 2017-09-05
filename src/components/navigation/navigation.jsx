import React from 'react';
import PropTypes from 'prop-types';

import NavigationItem from 'components/navigationItem/navigationItem';

export default class Navigation extends React.Component {
    render() {
        return (
            <div>
                <ul>
                    {
                        this.props.items.map((item, idx) => (
                            <NavigationItem key={idx} name={item.name} onClick={() => this.props.onItemClick(item.id)} active={item.active}></NavigationItem>
                        ))
                    }
                </ul>
            </div>
        );
    }
}

Navigation.propTypes = {
    onItemClick: PropTypes.func.isRequired,
    items: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
            active: PropTypes.bool.isRequired
        }).isRequired
    ).isRequired
};