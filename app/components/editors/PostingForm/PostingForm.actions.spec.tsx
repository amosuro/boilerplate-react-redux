declare let describe, it, expect, jest;

import {
    addRationale,
    clearForm,
    closePostingForm,
    deleteRationale,
    togglePostingForm,
    togglePrivacy,
    updateAction,
    updateAssetClass,
    updateContent,
    updateConvictionLevel,
    updateCurrencyPair,
    updateEndDate,
    updateEntry,
    updateHashtags,
    updateHeadline,
    updateIdeaName,
    updatePrivateUsers,
    updateProduct,
    updateRationale,
    updateRegion,
    updateSlLevel,
    updateTimeHorizon,
    updateTpLevel,
    updateStatus,
    updateStatusRationale,
    openInPostingForm
} from "./PostingForm";
import {SymUser, Posting} from "../../../models";

describe('PostingForm has actions that: ', () => {
    it('should create an action CLEAR_FORM', () => {
        const expectedAction = {
            type: 'CLEAR_FORM'
        };

        expect(clearForm()).toEqual(expectedAction);
    });

    it('should create an action UPDATE_HEADLINE', () => {
        const expectedAction = {
            type: 'UPDATE_HEADLINE',
            headline: 'test headline'
        };

        expect(updateHeadline('test headline')).toEqual(expectedAction);
    });

    it('should create an action UPDATE_MESSAGE', () => {
        const expectedAction = {
            type: 'UPDATE_MESSAGE',
            content: 'test content'
        };

        expect(updateContent('test content')).toEqual(expectedAction);
    });

    it('should create an action UPDATE_ASSET_CLASS', () => {
        const expectedAction = {
            type: 'UPDATE_ASSET_CLASS',
            assetClass: 'test asset class'
        };

        expect(updateAssetClass('test asset class')).toEqual(expectedAction);
    });

    it('should create an action UPDATE_REGION', () => {
        const expectedAction = {
            type: 'UPDATE_REGION',
            region: 'test region'
        };

        expect(updateRegion('test region')).toEqual(expectedAction);
    });

    it('should create an action UPDATE_PRIVACY', () => {
        const expectedAction = {
            type: 'UPDATE_PRIVACY'
        };

        expect(togglePrivacy()).toEqual(expectedAction);
    });

    it('should create an action UPDATE_PRIVATE_USER', () => {
        const mockUsers = [SymUser.MOCK_USER];

        const expectedAction = {
            type: 'UPDATE_PRIVATE_USER',
            privateUsers: mockUsers
        };

        expect(updatePrivateUsers(mockUsers)).toEqual(expectedAction);
    });

    it('should create an action CLOSE_POSTING_FORM', () => {
        const expectedAction = {
            type: 'CLOSE_POSTING_FORM'
        };

        expect(closePostingForm()).toEqual(expectedAction);
    });

    it('should create an action TOGGLE_POSTING_FORM', () => {
        const expectedAction = {
            type: 'TOGGLE_POSTING_FORM',
            postingType: 'C'
        };

        expect(togglePostingForm('C')).toEqual(expectedAction);
    });

    it('should create an action UPDATE_IDEA_NAME', () => {
        const expectedAction = {
            type: 'UPDATE_IDEA_NAME',
            ideaName: 'test idea'
        };

        expect(updateIdeaName('test idea')).toEqual(expectedAction);
    });

    it('should create an action UPDATE_CURRENCY_PAIR', () => {
        const expectedAction = {
            type: 'UPDATE_CURRENCY_PAIR',
            currencyPair: 'GBPUSD'
        };

        expect(updateCurrencyPair('GBPUSD')).toEqual(expectedAction);
    });

    it('should create an action UPDATE_PRODUCT', () => {
        const expectedAction = {
            type: 'UPDATE_PRODUCT',
            product: 'Spot'
        };

        expect(updateProduct('Spot')).toEqual(expectedAction);
    });

    it('should create an action UPDATE_TIME_HORIZON', () => {
        const expectedAction = {
            type: 'UPDATE_TIME_HORIZON',
            timeHorizon: '1W'
        };

        expect(updateTimeHorizon('1W')).toEqual(expectedAction);
    });

    it('should create an action UPDATE_ACTION', () => {
        const expectedAction = {
            type: 'UPDATE_ACTION',
            action: 'BUY'
        };

        expect(updateAction('BUY')).toEqual(expectedAction);
    });

    it('should create an action UPDATE_ENTRY', () => {
        const expectedAction = {
            type: 'UPDATE_ENTRY',
            entry: '1.00'
        };

        expect(updateEntry('1.00')).toEqual(expectedAction);
    });

    it('should create an action UPDATE_TP_LEVEL', () => {
        const expectedAction = {
            type: 'UPDATE_TP_LEVEL',
            tpLevel: '2.00'
        };

        expect(updateTpLevel('2.00')).toEqual(expectedAction);
    });

    it('should create an action UPDATE_SL_LEVEL', () => {
        const expectedAction = {
            type: 'UPDATE_SL_LEVEL',
            slLevel: '3.00'
        };

        expect(updateSlLevel('3.00')).toEqual(expectedAction);
    });

    it('should create an action UPDATE_RATIONALE', () => {
        const expectedAction = {
            type: 'UPDATE_RATIONALE',
            rationaleToUpdate: 'test rationale',
            newValue: 'updated test rationale'
        };

        expect(updateRationale('updated test rationale', 'test rationale')).toEqual(expectedAction);
    });

    it('should create an action DELETE_RATIONALE', () => {
        const expectedAction = {
            type: 'DELETE_RATIONALE',
            rationaleIndex: 1
        };

        expect(deleteRationale(1)).toEqual(expectedAction);
    });

    it('should create an action ADD_RATIONALE', () => {
        const expectedAction = {
            type: 'ADD_RATIONALE',
            rationale: 'test rationale'
        };

        expect(addRationale('test rationale')).toEqual(expectedAction);
    });

    it('should create an action UPDATE_CONVICTION_LEVEL', () => {
        const expectedAction = {
            type: 'UPDATE_CONVICTION_LEVEL',
            convictionLevel: '>80%'
        };

        expect(updateConvictionLevel('>80%')).toEqual(expectedAction);
    });

    it('should create an action UPDATE_HASHTAGS', () => {
        const expectedAction = {
            type: 'UPDATE_HASHTAGS',
            content: 'test-hashtag content'
        };

        expect(updateHashtags('test-hashtag content')).toEqual(expectedAction);
    });

    it('should create an action UPDATE_STATUS', () => {
        Date.now = jest.fn(() => 1487076708000);

        const expectedAction = {
            type: 'UPDATE_STATUS',
            status: 'OPEN',
            timestamp: 1487076708000
        };

        expect(updateStatus('OPEN')).toEqual(expectedAction);
    });

    it('should create an action UPDATE_STATUS_RATIONALE', () => {
        Date.now = jest.fn(() => 1487076708000);

        const expectedAction = {
            type: 'UPDATE_STATUS_RATIONALE',
            statusRationale: 'This is a test rationale'
        };

        expect(updateStatusRationale('This is a test rationale')).toEqual(expectedAction);
    });

    it('should create an action OPEN_IN_POSTING_FORM', () => {
        const posting = Posting.MOCK_TI_POSTING;

        const expectedAction = {
            type: 'OPEN_IN_POSTING_FORM',
            posting: posting
        };

        expect(openInPostingForm(posting)).toEqual(expectedAction);
    });

    it('should create an action UPDATE_END_DATE', () => {
        const expectedAction = {
            type: 'UPDATE_END_DATE',
            endDate: '2017-12-14T14:51:40+00:00'
        };

        expect(updateEndDate('2017-12-14T14:51:40+00:00')).toEqual(expectedAction);
    });
});