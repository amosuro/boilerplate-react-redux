import * as model from "../models";
import AppSettings from "./app-settings";
import * as jwtDecode from "jwt-decode";

declare const SYMPHONY: any;

class SymphonyServices {

    private navService: any;
    private modulesService: any;
    private shareService: any;
    private extendedUserInfoService: any;
    private uiService: any;

    private jwt: string;

    public init = () => {
        this.navService = SYMPHONY.services.subscribe('applications-nav');
        this.modulesService = SYMPHONY.services.subscribe('modules');
        this.shareService = SYMPHONY.services.subscribe('share');
        this.extendedUserInfoService = SYMPHONY.services.subscribe('extended-user-info');
        this.uiService = SYMPHONY.services.subscribe('ui');

        this.uiService.listen('themeChangeV2', this.setTheme);
    };

    public openLink = (url) => {
        this.modulesService.openLink(url);
    };

    public share = (title, subTitle, blurb, date, publisher, author, id) => {
        const articleOptions = {
            thumbnail: AppSettings.getSloganLogoIcon(),
            title: title,
            subTitle: subTitle,
            blurb: blurb && blurb.length > 50 ? blurb.substring(0, 50) + '...' : blurb,
            date: date,
            publisher: publisher,
            author: author,
            id: id
        };
        this.shareService.share("article", articleOptions);
    };

    public getUserInfo = () => {
        return this.extendedUserInfoService.getJwt().then((jwt) => {
            console.log('App Flow - Got JWT'); // Do not log  the JWT token to console for security reasons
            this.jwt = jwt;
            return model.User.fromJson(jwtDecode(jwt).user);
        });
    };

    public setLeftNavMenuCounter = (count) => {
        //this counter is not working properly, its showing wrong notification number to users, the logic needs to be reviewed.
        //this.extendedUserInfoService.count(AppSettings.getAppId() + "-nav", count);
    };

    public getJwt = () => {
        return this.jwt;
    };

    public isAuthenticated = () => {
        return !!this.jwt;
    };
    public setTheme = (theme) => {
        const externalSymphonyAppClassName: string = 'symphony-external-app';

        document.documentElement.className = `${externalSymphonyAppClassName} ${theme.size}`;
        document.body.className = `${externalSymphonyAppClassName} ${theme.name}`;
    };

}

export const symphonyServices = new SymphonyServices();