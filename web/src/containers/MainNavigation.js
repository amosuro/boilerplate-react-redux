import { connect } from 'react-redux';

import { toggleNavItem } from '../actions';
import Navigation from '../components/Navigation/Navigation';

const mapStateToProps = state => {
    return {
        items: state.navigation
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onItemClick: id => {
            dispatch(toggleNavItem(id))
        }
    }
};

const MainNavigation = connect(
    mapStateToProps,
    mapDispatchToProps
)(Navigation);

export default MainNavigation;