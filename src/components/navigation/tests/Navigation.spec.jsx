import React from 'react';
import { shallow } from 'enzyme';

import Navigation from '../Navigation';

describe('<TestComponent/>', () => {
    it('renders a <h1> tag', () => {
        expect(shallow(<Navigation />).contains(<h1>This is a test component</h1>)).toBe(true);
    });
});