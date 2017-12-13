import preconditions from "../services/preConditions";
import logger from "../services/logger";

export default {

    servicesWanted: ['ui', 'modules', 'applications-nav', 'extended-user-info', 'share'],

    getAppServiceName: (appId) => {
        preconditions.shouldNotBeEmpty(appId, 'appId must not be empty!');
        return `${appId}:controller`;
    },

    setTheme: (theme) => {
        preconditions.shouldBeObject(theme, 'theme must be an object!');
        logger.debug("[SEED] common.setTheme theme", theme);
        window.document.documentElement.className = theme.size;
        window.document.body.className = theme.name;
    }
};