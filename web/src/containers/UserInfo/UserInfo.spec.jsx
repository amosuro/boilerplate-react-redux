import React from "react";
import {mount} from "enzyme";

import {shallowRender} from "../../../test/testHelpers";
import {UserInfo} from "./UserInfo";

function setup() {
    const props = {
        appid: 'appId',
        jetEnabled: false,
        jwtToken: 'test-token',
        refreshJwtToken: jest.fn()
    };

    const enzymeWrapper = mount(<UserInfo {...props} />);

    return {
        props,
        enzymeWrapper
    };
}

describe('<UserInfo /> is a component that: ', () => {
    it('should render an article with display name, email address, company and username if user is defined', () => {
        const mockUser = {
            displayName: 'Test User Display Name',
            emailAddress: 'test.user@hsbc.com',
            company: 'Test Company',
            username: '000000'
        };

        spyOn(UserInfo.prototype, 'getUser').and.returnValue(mockUser);

        const {enzymeWrapper} = shallowRender(<UserInfo />, {
            appid: 'appId',
            jetEnabled: false,
            jwtToken: 'test-token',
            refreshJwtToken: jest.fn()
        });

        enzymeWrapper.update();

        expect(enzymeWrapper.find('.user-info__heading').text()).toEqual('User Info');
        expect(enzymeWrapper.find('.user-info-panel__details > div').at(0).text()).toEqual('Email: test.user@hsbc.com');
        expect(enzymeWrapper.find('.user-info-panel__details > div').at(1).text()).toEqual('Company: Test Company');
        expect(enzymeWrapper.find('.user-info-panel__details > div').at(2).text()).toEqual('ID: 000000');
    });
});