import * as jwtModel from "./jwt-model";
import * as jwtService from "./jwt-service";
import * as model from "../models";
import AppSettings from "./app-settings";
const objectAssign = require('object-assign');

declare const require: any;
declare const SYMPHONY: any;

console.log("Controller Flow - appId=" + AppSettings.getAppId() + ", appTitle=" + AppSettings.getAppTitle());

const controllerService = SYMPHONY.services.register(AppSettings.getControllerId());

SYMPHONY.remote.hello().then((response) => {

    console.log("Controller Flow - hello()", response);

    // jwtservice.authenticate().then((appData: jwtmodel.AppData) => {

        SYMPHONY.application
            .register({appId: AppSettings.getAppId(), tokenA: AppSettings.getTokenA()}, ['ui', 'modules', 'applications-nav', 'extended-user-info', 'share'], [AppSettings.getControllerId()])
            .then(json => {
                    console.log("Controller Flow - register() response", json);
                    return jwtModel.SymphonyAppRegisterResponse.fromJson(json);
                }
            )

            // Server side is not doing any validation so this has been commented out for now
            // .then((response: jwtModel.SymphonyAppRegisterResponse) => jwtService.validateTokens(appData.appId, appData.tokenA, response.symphonyToken))

            .then(response => {
                // console.log("Controller Flow - validateTokens()", response);

                const uiService = SYMPHONY.services.subscribe('ui');

                const extensionOptions = {
                    icon: AppSettings.getDefaultLogoIcon(),
                    label: AppSettings.getAppTitle(),
                    data: {"datetime": new Date()}
                };

                const hashtagServiceId = 'hashtagService-' + (new Date()).getTime();
                uiService.registerExtension('hashtag', hashtagServiceId, AppSettings.getControllerId(), objectAssign(extensionOptions, {data: {hashtag: true}}));

                const cashtagServiceId = 'cashtagService-' + (new Date()).getTime();
                uiService.registerExtension('cashtag', cashtagServiceId, AppSettings.getControllerId(), objectAssign(extensionOptions, {data: {cashtag: true}}));

                const navService = SYMPHONY.services.subscribe('applications-nav');
                const modulesService = SYMPHONY.services.subscribe('modules');
                const shareService = SYMPHONY.services.subscribe("share");
                shareService.handleLink("article", AppSettings.getControllerId());

                // LEFT NAV: Add an entry to the left navigation for our application
                navService.add(AppSettings.getAppId() + "-nav", {title: AppSettings.getAppTitle(), icon: AppSettings.getDefaultLogoIcon()}, AppSettings.getControllerId());

                // Implement some methods on our local service. These will be invoked by user actions.
                controllerService.implement({
                    // LEFT NAV & MODULE: When the left navigation item is clicked on, invoke Symphony's module service to show our application in the grid
                    select: function (id) {
                        /*
                         if (id == appId + "-nav") {
                         // Focus the left navigation item when clicked
                         navService.focus("hello-nav");
                         }
                         */
                        this.showApp(AppSettings.getAppUrl());
                    },

                    link: function (type, postingId) {
                        if (type == "article") {
                            console.log("Opening posting with id " + postingId);
                            this.showApp(AppSettings.getAppUrl() + '#/view-posting/' + postingId);
                        }
                    },

                    trigger: function (uiClass, id, payload, data) {
                        let url = AppSettings.getAppUrl();
                        if (payload.entity.name) {
                            url = AppSettings.getAppUrl() + (data.hashtag ? '#/?searchHashtag=' : '#/?searchCashtag=') + payload.entity.name.substring(1);
                        }
                        this.showApp(url);
                    },

                    showApp: function (url) {
                        modulesService.show(model.Utils.windowID("tc"), {title: AppSettings.getAppTitle(), icon: AppSettings.getHeaderLogoIcon()}, AppSettings.getControllerId(), url, {
                            canFloat: true,
                            parentModuleId: AppSettings.getAppId()
                        });
                        // Focus the module after it is shown
                        modulesService.focus(AppSettings.getAppId());
                    }
                });
            })
            .fail(e => console.log("Controller Flow - Exception during registration", e));
})
.fail(function (e) {
    console.log("Controller Flow - Exception during hello()", e);
});