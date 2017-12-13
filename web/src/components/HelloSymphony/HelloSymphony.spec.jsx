import React from "react";

import * as envService from "../../services/envService";
import {shallowRender} from '../../../test/testHelpers';

import HelloSymphony from "./HelloSymphony";

describe('<HelloSymphony /> is a component that: ', () => {
    it('should render a h1 tag and a paragraph tag containing appId and environment variables', () => {
        spyOn(envService, 'getNodeEnv').and.returnValue('development');

        const {enzymeWrapper, props} = shallowRender(<HelloSymphony />, {appId: 'test-app-id'});

        expect(enzymeWrapper.find('.hello-symphony__body').contains(props.appId)).toBe(true);
        expect(enzymeWrapper.find('.hello-symphony__body').contains('development')).toBe(true);
    });
});