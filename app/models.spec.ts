declare let jest, describe, it, expect, beforeEach, spyOn;

import { FxTradeIdeaPosting } from './models';

describe('FxTradeIdeaPosting class: ', function() {
    beforeEach(function() {

    });

    it('creates a static property DEFAULT_FX_TRADE_IDEA_POSTING', () => {
        const fxTradeIdeaPosting = FxTradeIdeaPosting.DEFAULT_FX_TRADE_IDEA_POSTING;

        expect(fxTradeIdeaPosting.ideaName).toEqual('');
        expect(fxTradeIdeaPosting.currencyPair).toEqual('');
        expect(fxTradeIdeaPosting.product).toEqual('SPOT');
        expect(fxTradeIdeaPosting.timeHorizon).toEqual('ONE_WEEK');
        expect(fxTradeIdeaPosting.action).toEqual('BUY');
        expect(fxTradeIdeaPosting.entry).toEqual('');
        expect(fxTradeIdeaPosting.tpLevel).toEqual('');
        expect(fxTradeIdeaPosting.slLevel).toEqual('');
        expect(fxTradeIdeaPosting.rationale).toEqual('');
        expect(fxTradeIdeaPosting.convictionLevel).toEqual('<60%');
        expect(fxTradeIdeaPosting.riskRewardRatioFraction).toEqual(null);
        expect(fxTradeIdeaPosting.pricing).toEqual(null);
    });
});