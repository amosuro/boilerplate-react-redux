import preconditions from "../services/preConditions";
import common from "./common";
import logger from "../services/logger";

const SYMPHONY = window.SYMPHONY;

class SymphonyControllerWrapper {

    constructor() {
        this.init = this.init.bind(this);
        this._registerApp = this._registerApp.bind(this);
        this._addAppServiceHandlers = this._addAppServiceHandlers.bind(this);
        this._addAppToLeftNav = this._addAppToLeftNav.bind(this);
        this._registerHashtag = this._registerHashtag.bind(this);
        this._getAppServiceName = this._getAppServiceName.bind(this);
        this._openApp = this._openApp.bind(this);
    }

    _getAppServiceName() {
        preconditions.shouldNotBeEmpty(this.config.id, "config.id must not be empty!");
        return common.getAppServiceName(this.config.id);
    }

    _registerApp() {
        const appData = (this.config.jwtEnabled
                ? {appId: this.config.id, tokenA: this.config.tokenA}
                : {appId: this.config.id}
        );

        return SYMPHONY.application.register(appData, common.servicesWanted, [this._getAppServiceName()]);
    }

    _addAppServiceHandlers() {
        this.appService.implement({
            select: function (id) {
                logger.debug("[SEED] controllerWrapper.select left nav item click", id);
                this._openApp('');
            }.bind(this),
            trigger: function (uiClass, id, payload, data) {
                logger.debug("[SEED] controllerWrapper.trigger", uiClass, id, payload);
                if (uiClass === "hashtag") {
                    this._openApp('');
                }
            }.bind(this)
        });
    }

    _addAppToLeftNav() {
        const navService = SYMPHONY.services.subscribe('applications-nav');
        preconditions.shouldBeObject(navService, 'navService must be an object!');
        preconditions.shouldNotBeEmpty(this.config.title, "config.title must not be empty!");
        preconditions.shouldNotBeEmpty(this.config.logo, "config.logo must not be empty!");

        const navItemId = `${this.config.id}-nav`;
        const navOptions = {title: this.config.title, icon: this.config.logo};

        navService.add(navItemId, navOptions, this._getAppServiceName());
    }

    _registerHashtag() {
        const uiService = SYMPHONY.services.subscribe('ui');
        preconditions.shouldBeObject(uiService, 'uiService must be an object!');
        preconditions.shouldNotBeEmpty(this.config.title, "config.title must not be empty!");
        preconditions.shouldNotBeEmpty(this.config.logo, "config.logo must not be empty!");

        const uiClass = 'hashtag';
        const extensionId = `${this.config.id}-${uiClass}-extension`;
        const options = {label: this.config.title, icon: this.config.logo};

        uiService.registerExtension(uiClass, extensionId, this._getAppServiceName(), options);
    };

    _openApp() {
        const modulesService = SYMPHONY.services.subscribe('modules');
        preconditions.shouldBeObject(modulesService, 'modulesService must be an object!');
        preconditions.shouldNotBeEmpty(this.config.appEntryPoint, "SYMPHONY_APP_CONFIG.appEntryPoint must not be empty!");
        preconditions.shouldNotBeEmpty(this.config.title, "SYMPHONY_APP_CONFIG.title must not be empty!");
        preconditions.shouldNotBeEmpty(this.config.headerLogo, "SYMPHONY_APP_CONFIG.headerLogo must not be empty!");

        const iframe = `${this.config.appEntryPoint}`;
        logger.debug("[SEED] controllerWrapper.openApp iframe", iframe);

        const headerOptions = {title: this.config.title, icon: this.config.headerLogo};
        const options = {canFloat: true};

        modulesService.show(this.config.id, headerOptions, this._getAppServiceName(), iframe, options);
        modulesService.focus(this.config.id);
    }

    init(config) {
        preconditions.shouldBeObject(config, "config must be an object!");
        preconditions.shouldNotBeEmpty(config.id, "config.id must not be empty!");
        preconditions.shouldBeBoolean(config.jwtEnabled, "config.jwtEnabled must be boolean!");
        if (config.jwtEnabled) {
            preconditions.shouldNotBeEmpty(config.tokenA, "config.tokenA must not be empty!");
        }

        this.config = config;
        this.appService = window.SYMPHONY.services.register(this._getAppServiceName());

        return new Promise((resolve, reject) => {
            SYMPHONY.remote.hello()
                .then(this._registerApp)
                .then(this._addAppServiceHandlers)
                .then(this._addAppToLeftNav)
                .then(this._registerHashtag)
                .then(resolve)
                .catch(reject);
        });
    }
}

export default new SymphonyControllerWrapper();