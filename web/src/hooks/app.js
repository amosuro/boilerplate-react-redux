import preconditions from "../services/preConditions";
import common from "./common";
import logger from "../services/logger";

const SYMPHONY = window.SYMPHONY;

class SymphonyAppWrapper {

    constructor() {
        this.state = {
            appId: null,
            userReferenceId: null,
            jwtToken: null,
            jwtEnabled: null
        };

        this.init = this.init.bind(this);
        this._connectApp = this._connectApp.bind(this);
        this._obtainJwt = this._obtainJwt.bind(this);
    }

    _onHello(data) {
        logger.debug("[SEED] app._onHello data:", data);
        common.setTheme(data.themeV2);
    }

    _connectApp() {
        logger.debug("[SEED] app._connectApp");
        preconditions.shouldNotBeEmpty(this.state.appId, 'state.appId must not be null!');

        const appServiceName = common.getAppServiceName(this.state.appId);
        return SYMPHONY.application.connect(this.state.appId, common.servicesWanted, [appServiceName])
            .then(data => {
                logger.debug("[SEED] app._connectApp data:", data);
                this.state.userReferenceId = data.userReferenceId;
            });
    }

    _obtainJwt() {
        logger.debug("[SEED] app._obtainJwt jwtEnabled:", this.state.jwtEnabled);
        if (!this.state.jwtEnabled) {
            logger.debug("[SEED] app._obtainJwt resolving without jwtToken");
            return Promise.resolve();
        }

        const extendedUserInfoService = SYMPHONY.services.subscribe('extended-user-info');
        preconditions.shouldBeObject(extendedUserInfoService, 'extendedUserInfoService must be an object!');
        return extendedUserInfoService.getJwt().then(jwtToken => {
            logger.debug("[SEED] app._obtainJwt resolving with jwtToken:", jwtToken);
            this.state.jwtToken = jwtToken;
        });
    }

    _listenThemeChanges() {
        const uiService = SYMPHONY.services.subscribe('ui');
        preconditions.shouldBeObject(uiService, 'uiService must be an object!');
        uiService.listen("themeChangeV2", common.setTheme);
    };

    init(appId, jwtEnabled) {
        preconditions.shouldNotBeEmpty(appId, 'appId must not be empty!');
        preconditions.shouldBeBoolean(jwtEnabled, 'jwtEnabled must be boolean!');
        this.state.appId = appId;
        this.state.jwtEnabled = jwtEnabled;

        logger.debug("[SEED] app.init appId", appId, "jwtEnabled", jwtEnabled);

        return new Promise((resolve, reject) => {

            if (!SYMPHONY) {
                return reject('SYMPHONY object not found!');
            }

            SYMPHONY.remote.hello()
                .then(this._onHello)
                .then(this._connectApp)
                .then(this._obtainJwt)
                .then(this._listenThemeChanges)
                .then(() => {
                    resolve({
                        jwtToken: this.state.jwtToken,
                        userReferenceId: this.state.userReferenceId
                    });
                })
                .catch((e) => {
                    reject(e);
                });
        });
    }

    openLink(link) {
        preconditions.shouldNotBeEmpty(link, 'link must not be empty!');
        const modulesService = SYMPHONY.services.subscribe('modules');
        preconditions.shouldBeObject(modulesService, 'modulesService service must be object!');
        modulesService.openLink(link);
    }

    share(articleOptions) {
        const shareService = SYMPHONY.services.subscribe('share');
        preconditions.shouldBeObject(shareService, 'shareService must be object!');
        shareService.share('article', articleOptions);
    }
}

export default new SymphonyAppWrapper();