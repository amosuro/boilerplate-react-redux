import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import appRoot from './reducers';
import App from 'components/App/App';

import $ from 'jquery';

import json from './symphony/bundle.json';

// Create our own local service pertaining to the application module
// We have namespaced local services with "hello:"
var helloAppService = SYMPHONY.services.register("hello:app");

SYMPHONY.remote.hello().then(function(data) {

    // Set the theme of the app module
    var themeColor = data.themeV2.name;
    var themeSize = data.themeV2.size;
    // You must add the symphony-external-app class to the body element
    document.body.className = "symphony-external-app " + themeColor + " " + themeSize;

    let store = createStore(appRoot);

    ReactDOM.render(
        <Provider store={store}>
            <App />
        </Provider>, document.getElementById('root')
    );

    SYMPHONY.application.connect("hello", ["modules", "applications-nav", "ui", "share"], ["hello:app"]).then(function(response) {

        // The userReferenceId is an anonymized random string that can be used for uniquely identifying users.
        // The userReferenceId persists until the application is uninstalled by the user.
        // If the application is reinstalled, the userReferenceId will change.
        var userId = response.userReferenceId;

        // Subscribe to Symphony's services
        var modulesService = SYMPHONY.services.subscribe("modules");
        var navService = SYMPHONY.services.subscribe("applications-nav");
        var uiService = SYMPHONY.services.subscribe("ui");
        var shareService = SYMPHONY.services.subscribe("share");

        // UI: Listen for theme change events
        uiService.listen("themeChangeV2", function() {
            SYMPHONY.remote.hello().then(function(theme) {
                themeColor = theme.themeV2.name;
                themeSize = theme.themeV2.size;
                document.body.className = "symphony-external-app " + themeColor + " " + themeSize;
            });
        });

        // MODULE: Add a menu item to our module
        modulesService.addMenuItem("hello", "About Hello App", "hello-menu-item");
        modulesService.setHandler("hello", 'hello:app');

        helloAppService.implement({
            // If the menu item is selected, display the About text
            menuSelect: function(itemId) {
                if (itemId == "hello-menu-item") {
                    document.getElementById("about-hello-app").className = "";
                }
            }
        });
    }.bind(this))
}.bind(this));