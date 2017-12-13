export class AppData {
    constructor(appId: string, tokenA: string) {
        this.appId = appId;
        this.tokenA = tokenA;
    }

    appId: string;
    tokenA: string;

    public static fromJson = (json) => {
        return new AppData(json.appId, json.tokenA);
    }
}
export class JWTTokenInfo {
    constructor(aud: string, iss: string, sub: number, exp: string, user: JWTTokenUserInfo) {
        this.aud = aud;
        this.iss = iss;
        this.sub = sub;
        this.exp = exp;
        this.user = user;
    }

    aud: string;
    iss: string;
    sub: number;
    exp: string;
    user: JWTTokenUserInfo;
    static fromJson: (json) => JWTTokenInfo = (json) => new JWTTokenInfo(json.aud, json.iss, json.sub, json.exp, JWTTokenUserInfo.fromJson(json.user));
}
export class JWTTokenUserInfo {
    constructor(id: number, emailAddress: string, userName: string, firstName: string, lastName: string, displayName: string, title: string, company: string, companyId: number, location: string, smallAvatarUrl: string) {
        this.id = id;
        this.emailAddress = emailAddress;
        this.userName = userName;
        this.firstName = firstName;
        this.lastName = lastName;
        this.displayName = displayName;
        this.title = title;
        this.company = company;
        this.companyId = companyId;
        this.location = location;
        this.smallAvatarUrl = smallAvatarUrl;
    }

    id: number;
    emailAddress: string;
    userName: string;
    firstName: string;
    lastName: string;
    displayName: string;
    title: string;
    company: string;
    companyId: number;
    location: string;
    smallAvatarUrl: string;
    static fromJson: (json) => JWTTokenUserInfo = (json) => new JWTTokenUserInfo(json.id,
        json.emailAddress,
        json.userName,
        json.firstName,
        json.lastName,
        json.displayName,
        json.title,
        json.company,
        json.companyId,
        json.location,
        json.smallAvatarUrl
    );
}
export class SymphonyAppRegisterResponse {
    constructor(symphonyToken: string) {
        this.symphonyToken = symphonyToken;
    }

    symphonyToken: string;
    static fromJson: (json) => SymphonyAppRegisterResponse = (json) => new SymphonyAppRegisterResponse(json.symphonyToken)
}