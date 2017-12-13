import symphonyAppWrapper from "./app";
import common from "./common";

describe('app wrapper', () => {

    const mockSubscriptions = {
        getJwt: jest.fn(),
        share: jest.fn(),
        openLink: jest.fn(),
        listen: jest.fn()
    };

    beforeEach(() => {
        window.SYMPHONY.remote.hello = jest.fn();
        window.SYMPHONY.application.connect = jest.fn();
        window.SYMPHONY.services.subscribe = jest.fn();
        spyOn(window.SYMPHONY.services, 'subscribe').and.returnValue(mockSubscriptions);
    });

    it("init() sets theme", async () => {

        expect.assertions(1);

        spyOn(common, 'setTheme');
        spyOn(window.SYMPHONY.remote, 'hello').and.returnValue(Promise.resolve({themeV2: 'themeV2'}));
        spyOn(window.SYMPHONY.application, 'connect').and.returnValue(Promise.resolve({}));

        await symphonyAppWrapper.init('appId', false);

        expect(common.setTheme).toBeCalledWith('themeV2');
    });

    it("init() listen for theme changes", async () => {

        expect.assertions(1);

        spyOn(common, 'setTheme');
        spyOn(window.SYMPHONY.remote, 'hello').and.returnValue(Promise.resolve({themeV2: 'themeV2'}));
        spyOn(window.SYMPHONY.application, 'connect').and.returnValue(Promise.resolve({}));
        spyOn(mockSubscriptions, 'listen');

        await symphonyAppWrapper.init('appId', false);

        expect(mockSubscriptions.listen).toHaveBeenCalledWith('themeChangeV2', common.setTheme);
    });

    it("init() connects the app, without jwt token", async () => {

        expect.assertions(2);

        spyOn(common, 'setTheme');
        spyOn(common, 'getAppServiceName').and.returnValue('appServiceName');

        spyOn(window.SYMPHONY.remote, 'hello').and.returnValue(Promise.resolve({themeV2: 'themeV2'}));
        spyOn(window.SYMPHONY.application, 'connect').and.returnValue(Promise.resolve({userReferenceId: 'userReferenceId'}));

        const initResult = await symphonyAppWrapper.init('appId', false);

        expect(window.SYMPHONY.application.connect).toHaveBeenCalledWith('appId', common.servicesWanted, ['appServiceName']);
        expect(initResult).toEqual({
            userReferenceId: 'userReferenceId',
            jwtToken: null
        });

    });

    it("init() connects the app, with jwt token", async () => {

        expect.assertions(2);

        spyOn(common, 'setTheme');
        spyOn(common, 'getAppServiceName').and.returnValue('appServiceName');

        spyOn(window.SYMPHONY.remote, 'hello').and.returnValue(Promise.resolve({themeV2: 'themeV2'}));
        spyOn(window.SYMPHONY.application, 'connect').and.returnValue(Promise.resolve({userReferenceId: 'userReferenceId'}));
        spyOn(mockSubscriptions, 'getJwt').and.returnValue(Promise.resolve('jwtToken'));

        const initResult = await symphonyAppWrapper.init('appId', true);

        expect(window.SYMPHONY.application.connect).toHaveBeenCalledWith('appId', common.servicesWanted, ['appServiceName']);
        expect(initResult).toEqual({
            userReferenceId: 'userReferenceId',
            jwtToken: 'jwtToken'
        });
    });

    it("init() returns rejected promise when SYMPHONY.remote.hello fails", async () => {
        expect.assertions(1);
        spyOn(window.SYMPHONY.remote, 'hello').and.returnValue(Promise.reject('hello-error'));
        await expect(symphonyAppWrapper.init('appId', true)).rejects.toEqual('hello-error');
    });

    it("init() returns rejected promise when getJwt token fails", async () => {
        expect.assertions(1);
        spyOn(common, 'setTheme');
        spyOn(window.SYMPHONY.remote, 'hello').and.returnValue(Promise.resolve({themeV2: 'themeV2'}));
        spyOn(window.SYMPHONY.application, 'connect').and.returnValue(Promise.reject('connect-error'));
        await expect(symphonyAppWrapper.init('appId', true)).rejects.toEqual('connect-error');
    });

    it("init() returns rejected promise when SYMPHONY.application.connect fails", async () => {
        expect.assertions(1);
        spyOn(common, 'setTheme');
        spyOn(window.SYMPHONY.remote, 'hello').and.returnValue(Promise.resolve({themeV2: 'themeV2'}));
        spyOn(window.SYMPHONY.application, 'connect').and.returnValue(Promise.resolve({userReferenceId: 'userReferenceId'}));
        spyOn(mockSubscriptions, 'getJwt').and.returnValue(Promise.reject('jwt-error'));
        await expect(symphonyAppWrapper.init('appId', true)).rejects.toEqual('jwt-error');
    });

    it("openLink()", async () => {
        expect.assertions(1);

        const url = 'http://www.google.co.uk';
        spyOn(mockSubscriptions, 'openLink');

        symphonyAppWrapper.openLink(url);

        expect(mockSubscriptions.openLink).toHaveBeenCalledWith(url);
    });

    it("share()", async () => {
        expect.assertions(1);

        const options = {foo: 'bar'};
        spyOn(mockSubscriptions, 'share');

        symphonyAppWrapper.share(options);

        expect(mockSubscriptions.share).toHaveBeenCalledWith('article', options);
    });

});