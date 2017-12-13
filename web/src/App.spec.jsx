import React from 'react';

import {mountWithRoute} from '../test/testHelpers';
import App from './App';

describe('<App/> is a component that:', () => {
    it('renders two links for Home and User Info components', () => {
        const element = mountWithRoute(<App />, '/');

        expect(element.find('a').at(0).text()).toEqual('Home');
        expect(element.find('a').at(0).props().href).toEqual('/');

        expect(element.find('a').at(1).text()).toEqual('User Info');
        expect(element.find('a').at(1).props().href).toEqual('/user-info');
    });
});