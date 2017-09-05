import React from 'react';
import { shallow } from 'enzyme';

import App from '../App';
import MainNavigation from '../../../containers/MainNavigation';

describe('<App/> is a component that:', () => {
    it('renders a div containing a <MainNavigation /> component', () => {
        expect(shallow(<App />).contains(<div><MainNavigation></MainNavigation></div>)).toBe(true);
    });
});