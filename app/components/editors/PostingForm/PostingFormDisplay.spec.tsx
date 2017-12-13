declare let jest, describe, it, expect, beforeEach, spyOn;

import {mount} from "enzyme";
import * as React from "react";

import {PostingFormDisplay, PostingFormProps, PostingFormState} from "./PostingForm";

const setup = () => {
    const props: PostingFormProps = {
        postingForm: PostingFormState.DEFAULT_STATE,
        postPreference: {
            assetClass: "",
            region: "",
            private_: false,
            privateUsers: []
        },
        smallAvatarUrl: '',
        userId: 1,
        dispatch: jest.fn(),

        handleAssetClassChange: jest.fn(),
        handleRegionChange: jest.fn(),
        handlePrivacyChange: jest.fn(),
        handlePrivateUsersChange: jest.fn(),

        handleHeadlineChange: jest.fn(),
        handleContentChange: jest.fn(),
        handleHashtagChange: (hashtags) => {},
        handleIdeaNameChange: jest.fn(),
        handleCurrencyPairChange: jest.fn(),
        handleEndDateChange: jest.fn(),
        handleProductChange: jest.fn(),
        handleTimeHorizonChange: jest.fn(),
        handleActionChange: jest.fn(),
        handleEntryChange: jest.fn(),
        handleTpLevelChange: jest.fn(),
        handleSlLevelChange: jest.fn(),
        handleRationaleUpdate: jest.fn(),
        handleRationaleRemove: jest.fn(),
        handleRationaleAdd: jest.fn(),
        handleConvictionLevelChange: jest.fn(),
        handlePostTypeChange: jest.fn(),

        onInitialFormLoad: jest.fn(),

        submit: jest.fn(),
        updateForm: jest.fn()
    };

    const enzymeWrapper = mount(<PostingFormDisplay {...props} />);

    return {
        props,
        enzymeWrapper
    };
};

describe('PostingFormDisplay component: ', function () {
    describe('detectHashtags is a method that: ', function () {
        let enzymeWrapper, props;

        beforeEach(function () {
            props = setup().props;
            enzymeWrapper = setup().enzymeWrapper;
        });

        it('calls findHashTags with the plain text from given content\'s ContentState object', function () {
            const content = 'testing #hashtag content';

            spyOn(enzymeWrapper.instance(), 'findHashTags').and.returnValue([]);

            enzymeWrapper.instance().detectHashtags(content);

            const expectedTextContent = 'testing #hashtag content';
            expect(enzymeWrapper.instance().findHashTags).toHaveBeenCalledWith(expectedTextContent);
        });
    });

    describe('findHashTags is a method that: ', function () {
        let enzymeWrapper, props;

        beforeEach(function () {
            props = setup().props;
            enzymeWrapper = setup().enzymeWrapper;
        });

        it('returns all unique hashtags from a given string', function () {
            const textContent = 'this is a #test message to #extract all #unique hashtags';

            const expectedHashtags = ['#test', '#extract', '#unique'];
            expect(enzymeWrapper.instance().findHashTags(textContent)).toEqual(expectedHashtags)
        });
    });
});