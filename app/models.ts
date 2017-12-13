import * as _ from "underscore";

interface Map<K, V> {
    clear(): void;
    delete(key: K): boolean;
    forEach(callbackfn: (value: V, key: K, map: Map<K, V>) => void, thisArg?: any): void;
    get(key: K): V | undefined;
    has(key: K): boolean;
    set(key: K, value: V): this;
    readonly size: number;
}
interface MapConstructor {
    new (): Map<any, any>;
    new <K, V>(entries?: [K, V][]): Map<K, V>;
    readonly prototype: Map<any, any>;
}
declare let Map: MapConstructor;

export class Utils {
    //TODO: use uuid npm module
    // generates a new Universally unique identify (UUID)
    public static windowID(prefix: string): string {
        let i, random, uuid = '';
        for (i = 0; i < 8; i++) {
            random = Math.random() * 16 | 0;
            uuid += (i === 12 ? 4 : (i === 16 ? (random & 3 | 8) : random)).toString(16);
        }
        return prefix + uuid;
    }
}

export class HashTagEnum {

    // asset classes
    public static FX: string = 'FX';
    public static FXO: string = 'FXO';
    public static RATES: string = 'RATES';
    public static CREDIT: string = 'CREDIT';
    public static EQUITIES: string = 'EQUITIES';
    public static COMMODITIES: string = 'COMMODITIES';

    // locations
    public static GLOBAL: string = 'GLOBAL';
    public static AMERICAS: string = 'AMERICAS';
    public static APAC: string = 'APAC';
    public static EMEA: string = 'EMEA';

    public static map: Map<string, [string]> = new Map<string, [string]>([
        [HashTagEnum.FX, ['FX', '#fx']],
        [HashTagEnum.FXO, ['FXO', '#fxo']],
        [HashTagEnum.RATES, ['Rates', '#rates']],
        [HashTagEnum.CREDIT, ['Credit', '#credit']],
        [HashTagEnum.EQUITIES, ['Equities', '#equities']],
        [HashTagEnum.COMMODITIES, ['Commodities', '#commodities']],

        [HashTagEnum.GLOBAL, ['Global', '#Global']],
        [HashTagEnum.AMERICAS, ['Americas', '#Americas']],
        [HashTagEnum.APAC, ['APAC', '#APAC']],
        [HashTagEnum.EMEA, ['EMEA', '#EMEA']]
    ]);

    public static labelFor(value: string): string {
        return HashTagEnum.map.get(value)[0];
    }

    public static hashtagFor(value: string): string {
        return HashTagEnum.map.get(value)[1];
    }

    public static findAssetClassHashTag(hashtags) {
        if (!hashtags) {
            return '';
        }
        for (let i: number = 0; i < hashtags.length; i++) {
            if (hashtags[i] === HashTagEnum.FX) {
                return HashTagEnum.labelFor(HashTagEnum.FX);
            }
            if (hashtags[i] === HashTagEnum.FXO) {
                return HashTagEnum.labelFor(HashTagEnum.FXO);
            }
            if (hashtags[i] === HashTagEnum.RATES) {
                return HashTagEnum.labelFor(HashTagEnum.RATES);
            }
            if (hashtags[i] === HashTagEnum.CREDIT) {
                return HashTagEnum.labelFor(HashTagEnum.CREDIT);
            }
            if (hashtags[i] === HashTagEnum.EQUITIES) {
                return HashTagEnum.labelFor(HashTagEnum.EQUITIES);
            }
            if (hashtags[i] === HashTagEnum.COMMODITIES) {
                return HashTagEnum.labelFor(HashTagEnum.COMMODITIES);
            }
        }
        return '';
    }
}

export class PostingTypesEnum {

    public static C: string = 'C';
    public static TI: string = 'TI';

    private static labelMap: Map<string, string> = new Map<string, string>([
        [PostingTypesEnum.C, 'Commentary'],
        [PostingTypesEnum.TI, 'Trade Idea']
    ]);

    private static hashtagMap: Map<string, string> = new Map<string, string>([
        [PostingTypesEnum.C, '#Commentary'],
        [PostingTypesEnum.TI, '#TradeIdea']
    ]);

    public static labelFor(postingType: string): string {
        return PostingTypesEnum.labelMap.get(postingType);
    }

    public static hashTagFor(postingType: string) {
        return PostingTypesEnum.hashtagMap.get(postingType);
    }

}

class SymphonyUser {
    id: number;
    displayName: string;
    emailAddress: string;
    avatars: Array<Avatar>;
    invalid: boolean
}

export class SymUser {
    static DEFAULT_AVATAR: string = "https://s3.amazonaws.com/user-pics-demo/small/symphony_small.png";
    static DEFAULT_USERNAME: string = "Unknown";
    static MOCK_USER = new SymUser(-1, SymUser.DEFAULT_USERNAME, '', SymUser.DEFAULT_AVATAR, false);

    id: number;
    displayName: string;
    emailAddress: string;
    smallAvatarUrl: string;
    invalid: boolean;

    constructor(id: number, displayName: string, emailAddress: string, smallAvatarUrl: string, invalid: boolean) {
        this.id = id;
        this.displayName = displayName;
        this.emailAddress = emailAddress;
        this.smallAvatarUrl = smallAvatarUrl;
        this.invalid = invalid;
    }

    public static fromJson(json: SymphonyUser): SymUser {
        if (json) {
            const smallAvatar: Avatar = SymUser.getSmallAvatar(json.avatars);
            return new SymUser(json.id, json.displayName, json.emailAddress,
                !!smallAvatar ? smallAvatar.url : SymUser.DEFAULT_AVATAR, json.invalid);
        }
        return null;
    }

    public static getSmallAvatar(avatars: Array<Avatar>): Avatar {
        return _.find(avatars, (avatar) => {
            return avatar.size === 'small';
        });
    }
}

export class RestApiError {
    constructor(title: string, details: string) {
        this.title = title;
        this.details = details;
    }

    title: string;
    details: string;
    public static fromJson: (json) => RestApiError = (json) => new RestApiError(json.error, json.message);
}

export class GenericPosting {

    static DEFAULT_GENERAL_POSING: GenericPosting = new GenericPosting("", "");

    headline: string;
    content: string;

    constructor(headline: string, content: string) {
        this.headline = headline;
        this.content = content;
    }

    static fromJson(json: any): GenericPosting {
        return json ? new GenericPosting(json.headline, json.content) : null;
    }

    clone(): GenericPosting {
        return new GenericPosting(this.headline, this.content);
    }
}

export class FxTradeIdeaPosting {

    static DEFAULT_FX_TRADE_IDEA_POSTING: FxTradeIdeaPosting = new FxTradeIdeaPosting("", "", "SPOT", "ONE_WEEK", null, "BUY", "", "", "", "", "<60%", null, null, "OPEN", "", null);

    ideaName: string;
    currencyPair: string;
    product: string;
    timeHorizon: string;
    action: string;
    entry: string;
    tpLevel: string;
    slLevel: string;
    rationale: string;
    convictionLevel: string;
    riskRewardRatioFraction: string;
    pricing: FxTradeIdeaPricing;
    endDate: string;
    status: string;
    statusRationale: string;
    statusTimestamp: number;

    constructor(ideaName: string, currencyPair: string, product: string, timeHorizon: string, endDate: string, action: string,
                entry: string, tpLevel: string, slLevel: string, rationale: string, convictionLevel: string,
                riskRewardRatioFraction: string, pricing: FxTradeIdeaPricing, status: string, statusRationale: string, statusTimestamp: number) {
        this.ideaName = ideaName;
        this.currencyPair = currencyPair;
        this.product = product;
        this.timeHorizon = timeHorizon;
        this.endDate = endDate;
        this.action = action;
        this.entry = entry;
        this.tpLevel = tpLevel;
        this.slLevel = slLevel;
        this.rationale = rationale;
        this.convictionLevel = convictionLevel;
        this.riskRewardRatioFraction = riskRewardRatioFraction;
        this.pricing = pricing;
        this.status = status;
        this.statusRationale = statusRationale;
        this.statusTimestamp = statusTimestamp;
    }

    static fromJson(json: any): FxTradeIdeaPosting {
        return json ? new FxTradeIdeaPosting(json.ideaName, json.currencyPair, json.product, json.timeHorizon, json.endDate, json.action,
            json.entry, json.tpLevel, json.slLevel, json.rationale, json.convictionLevel, json.riskRewardRatioFraction,
            FxTradeIdeaPricing.fromJson(json.pricing), 'OPEN', '', null)
            : null;
    }

    clone(): FxTradeIdeaPosting {
        return new FxTradeIdeaPosting(this.ideaName, this.currencyPair, this.product, this.timeHorizon, this.endDate, this.action,
            this.entry, this.tpLevel, this.slLevel, this.rationale, this.convictionLevel, this.riskRewardRatioFraction,
            this.pricing ? this.pricing.clone() : null, this.status, this.statusRationale, this.statusTimestamp)
    }
}

export class FxTradeIdeaPricing {

    latestMid: number;
    latestMidUpdatedAt: number;
    entryPriceMatchedMidAt: number;
    performance: number;

    constructor(latestMid: number, latestMidUpdatedAt: number, entryPriceMatchedMidAt: number, performance: number) {
        this.latestMid = latestMid;
        this.latestMidUpdatedAt = latestMidUpdatedAt;
        this.entryPriceMatchedMidAt = entryPriceMatchedMidAt;
        this.performance = performance;
    }

    static fromJson(json: any): FxTradeIdeaPricing {
        return json ? new FxTradeIdeaPricing(json.latestMid, json.latestMidUpdatedAt, json.entryPriceMatchedMidAt, json.performance)
            : null;
    }

    clone(): FxTradeIdeaPricing {
        return new FxTradeIdeaPricing(this.latestMid, this.latestMidUpdatedAt, this.entryPriceMatchedMidAt, this.performance)
    }
}

export class Posting {
    static MOCK_TI_POSTING = new Posting('1234', SymUser.MOCK_USER, 12345, 'FX', 'AMERICAS', false, [], [], [], [], 0, 0,
        0, 0, 'TI', null, FxTradeIdeaPosting.DEFAULT_FX_TRADE_IDEA_POSTING, []);


    idHexadecimal: string;
    fromUser: SymUser;
    timestamp: number;

    assetClass: string;
    region: string;

    private_: boolean;
    privateUsers: Array<SymUser>;

    tags: string[];
    likes: Like[];
    comments: Comment[];

    viewsCount: number;
    likesCount: number;
    commentsCount: number;
    sharesCount: number;

    postingType: string;
    genericPosting: GenericPosting;
    fxTradeIdeaPosting: FxTradeIdeaPosting;
    commentaryHashtags: any;

    constructor(idHexadecimal: string, fromUser: SymUser, timestamp: number, assetClass: string, region: string,
                private_: boolean, privateUsers: Array<SymUser>,
                tags: string[], likes: Like[], comments: Comment[], viewsCount: number, likesCount: number,
                commentsCount: number, sharesCount: number, postingType: string, genericPosting: GenericPosting,
                fxTradeIdeaPosting: FxTradeIdeaPosting, commentaryHashtags: any) {
        this.idHexadecimal = idHexadecimal;
        this.fromUser = fromUser;
        this.timestamp = timestamp;
        this.assetClass = assetClass;
        this.region = region;

        this.private_ = private_;
        this.privateUsers = privateUsers;

        this.tags = tags;
        this.likes = likes;
        this.comments = comments;
        this.viewsCount = viewsCount;
        this.likesCount = likesCount;
        this.commentsCount = commentsCount;
        this.sharesCount = sharesCount;
        this.postingType = postingType;
        this.genericPosting = genericPosting;
        this.fxTradeIdeaPosting = fxTradeIdeaPosting;
        this.commentaryHashtags = commentaryHashtags;
    }

    static fromJson(json: any): Posting {
        let privateUsers = _.map(json.privateUsers, (privateUser: SymphonyUser) => SymUser.fromJson(privateUser));
        return new Posting(json.idHexadecimal, SymUser.fromJson(json.fromUser), json.timestamp,
            json.assetClass, json.region, json.private_, privateUsers, json.tags,
            json.likes, json.comments, json.viewsCount, json.likesCount, json.commentsCount, json.sharesCount, json.postingType,
            GenericPosting.fromJson(json.genericPosting), FxTradeIdeaPosting.fromJson(json.fxTradeIdeaPosting), []);
    }

    isFxTradeIdea(): boolean {
        return this.postingType === PostingTypesEnum.TI && this.assetClass === HashTagEnum.FX;
    }
}

interface Avatar {
    size: string,
    url: string
}

export class Like {
    constructor(userId: number, timestamp: number) {
        this.userId = userId;
        this.timestamp = timestamp;
    }

    userId: number;
    timestamp: number;
}

export class Comment {

    postingId: string;
    user: SymUser;
    timestamp: number;
    content: string;

    constructor(postingId: string, user: SymUser, timestamp: number, content: string) {
        this.user = user;
        this.timestamp = timestamp;
        this.content = content;
        this.postingId = postingId;
    }

    static fromJson(json): Comment {
        return new Comment(json.postingId, json.user, json.timestamp, json.content);
    }
}

export class Response {
    constructor(status: number, body: any) {
        this.status = status;
        this.body = body;
    }

    status: number;
    body: any;
}

export interface PostPreference {
    assetClass: string;
    region: string;
    private_: boolean;
    privateUsers: Array<SymUser>;
}

export class User {
    public static DEFAULT_SMALL_AVATAR_URL: string = "https://s3.amazonaws.com/user-pics-demo/small/symphony_small.png";
    public static DEFAULT_USERNAME: string = "Unknown";

    id: number;
    smallAvatarUrl: string;
    displayName: string;
    emailAddress: string;
    firstName: string;
    lastName: string;
    username: string;
    company: string;
    companyId: number;

    constructor(id: number, smallAvatarUrl: string, displayName: string, emailAddress: string,
                firstName: string, lastName: string, username: string, company: string, companyId: number) {
        this.id = id;
        this.smallAvatarUrl = smallAvatarUrl;
        this.displayName = displayName;
        this.emailAddress = emailAddress;
        this.firstName = firstName;
        this.lastName = lastName;
        this.username = username;
        this.company = company;
        this.companyId = companyId;
    }

    public static fromJson: (json) => User = (json) => {
        if (json) {
            return new User(json.id, json.smallAvatarUrl, json.displayName, json.emailAddress, json.firstName, json.lastName, json.username, json.company, json.companyId);
        }
    }

}

export class UserInfoState {
    public static DEFAULT_STATE: UserInfoState = new UserInfoState(null, true);

    user: User;
    isFetching: boolean = false;

    constructor(user: User, isFetching: boolean) {
        this.user = user;
        this.isFetching = isFetching;
    }
}