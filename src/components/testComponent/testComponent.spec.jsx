import React from 'react';
import { shallow } from 'enzyme';

import TestComponent from './testComponent';

describe('<TestComponent/>', () => {
    it('renders a <h1> tag', () => {
        expect(shallow(<TestComponent />).contains(<h1>This is a test component</h1>)).toBe(true);
    });
});