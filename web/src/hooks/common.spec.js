import common from "./common";

describe('common', () => {

    it('servicesWanted', () => {
        const services = common.servicesWanted;
        expect(services).toEqual(['ui', 'modules', 'applications-nav', 'extended-user-info', 'share']);
    });

    it('getAppServiceName', () => {
        const controllerName = common.getAppServiceName("appId");
        expect(controllerName).toEqual("appId:controller");
    });

    it('setTheme', () => {
        common.setTheme({size: 'size', name: 'name'});
        expect(window.document.documentElement.className).toEqual('size');
        expect(window.document.body.className).toEqual('name');
    });
});