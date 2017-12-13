import React from 'react';
import {mount, shallow} from 'enzyme';
import {MemoryRouter} from 'react-router-dom';


export const mountWithRoute = (Component, path) => {
    return (
        mount(<MemoryRouter initialEntries={[path]}>{Component}</MemoryRouter>)
    );
}

export const shallowRender = (Component, props) => {
    const enzymeWrapper = shallow(Component);

    enzymeWrapper.setProps({...props});

    return {
        props,
        enzymeWrapper
    };
}