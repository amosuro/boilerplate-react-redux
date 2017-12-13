declare global {
    interface Window { SYMPHONY_APP_CONFIG: any; }
}

const APP_CONFIG = window.SYMPHONY_APP_CONFIG;

class AppSettings {

    public static getAppId = () => {
        return APP_CONFIG.id;
    };

    public static getAppTitle = () => {
        return APP_CONFIG.title;
    };

    public static getTokenA = () => {
        return APP_CONFIG.tokenA;
    };

    public static getControllerId = () => {
        return AppSettings.getAppId() + ":controller";
    };

    public static getHost = () => {
        return "https://" + window.location.hostname + ":" + window.location.port;
    };

    public static getAppUrl = () => {
        return AppSettings.getHost() + "/app.html";
    };

    public static getDefaultLogoIcon = () => {
        return AppSettings.getHost() + "/images/HSBC-diamond-red.svg";
    };

    public static getHeaderLogoIcon = () => {
        return AppSettings.getHost() + "/images/HSBC-diamond-red-2.svg";
    };

    public static getSloganLogoIcon = () => {
        return AppSettings.getHost() + "/images/markets-commentary-double-line.svg";
    };
}

export default AppSettings;