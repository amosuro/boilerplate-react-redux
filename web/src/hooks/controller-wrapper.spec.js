import controllerWrapper from "./controller-wrapper";
import common from "./common";

describe('controller wrapper', () => {

    const mockSubscriptions = {
            add: jest.fn(),
            registerExtension: jest.fn(),
            show: jest.fn(),
            focus: jest.fn()
        },
        mockAppService = {
            implement: jest.fn()
        };

    let config;

    beforeEach(() => {
        window.SYMPHONY.remote.hello = jest.fn();
        window.SYMPHONY.application.register = jest.fn();
        window.SYMPHONY.services.register = jest.fn();
        window.SYMPHONY.services.subscribe = jest.fn();
        spyOn(window.SYMPHONY.services, 'subscribe').and.returnValue(mockSubscriptions);
        spyOn(window.SYMPHONY.services, 'register').and.returnValue(mockAppService);

        config = {
            id: 'appId',
            jwtEnabled: false,
            title: 'appTitle',
            logo: 'appLogo',
            headerLogo: 'headerLogo',
            appEntryPoint: "appEntryPoint"
        };
    });

    it("init() registers the app, without jwt token", async () => {

        expect.assertions(1);

        spyOn(common, 'getAppServiceName').and.returnValue('appServiceName');

        spyOn(window.SYMPHONY.remote, 'hello').and.returnValue(Promise.resolve());
        spyOn(window.SYMPHONY.application, 'register').and.returnValue(Promise.resolve());

        await controllerWrapper.init(config);

        expect(window.SYMPHONY.application.register).toHaveBeenCalledWith(
            {
                appId: 'appId'
            },
            common.servicesWanted, ['appServiceName']);
    });

    it("init() registers the app, with jwt token", async () => {

        expect.assertions(1);

        config = {...config, jwtEnabled: true, tokenA: 'tokenA'};

        spyOn(common, 'getAppServiceName').and.returnValue('appServiceName');
        spyOn(window.SYMPHONY.remote, 'hello').and.returnValue(Promise.resolve());
        spyOn(window.SYMPHONY.application, 'register').and.returnValue(Promise.resolve());

        await controllerWrapper.init(config);

        expect(window.SYMPHONY.application.register).toHaveBeenCalledWith(
            {
                appId: 'appId',
                tokenA: 'tokenA'
            },
            common.servicesWanted,
            ['appServiceName']);
    });

    it("init() adds service handlers", async () => {

        expect.assertions(1);

        spyOn(mockAppService, 'implement');
        spyOn(common, 'getAppServiceName').and.returnValue('appServiceName');
        spyOn(window.SYMPHONY.remote, 'hello').and.returnValue(Promise.resolve());
        spyOn(window.SYMPHONY.application, 'register').and.returnValue(Promise.resolve());

        await controllerWrapper.init(config);

        expect(mockAppService.implement).toHaveBeenCalled();
    });

    it("init() adds nav item", async () => {

        expect.assertions(1);

        spyOn(mockSubscriptions, 'add');
        spyOn(common, 'getAppServiceName').and.returnValue('appServiceName');
        spyOn(window.SYMPHONY.remote, 'hello').and.returnValue(Promise.resolve());
        spyOn(window.SYMPHONY.application, 'register').and.returnValue(Promise.resolve());

        await controllerWrapper.init(config);

        expect(mockSubscriptions.add).toHaveBeenCalledWith(
            "appId-nav",
            {
                title: "appTitle",
                icon: "appLogo"
            },
            "appServiceName"
        );
    });

    it("init() registers hashtag", async () => {

        expect.assertions(1);

        spyOn(mockSubscriptions, 'registerExtension');
        spyOn(common, 'getAppServiceName').and.returnValue('appServiceName');
        spyOn(window.SYMPHONY.remote, 'hello').and.returnValue(Promise.resolve());
        spyOn(window.SYMPHONY.application, 'register').and.returnValue(Promise.resolve());

        await controllerWrapper.init(config);

        expect(mockSubscriptions.registerExtension).toHaveBeenCalledWith("hashtag",
            "appId-hashtag-extension",
            "appServiceName",
            {
                label: "appTitle",
                icon: "appLogo"
            }
        );
    });

    it("_openApp() opens the app", async () => {

        expect.assertions(2);

        spyOn(mockSubscriptions, 'show');
        spyOn(mockSubscriptions, 'focus');
        spyOn(common, 'getAppServiceName').and.returnValue('appServiceName');
        spyOn(window.SYMPHONY.remote, 'hello').and.returnValue(Promise.resolve());
        spyOn(window.SYMPHONY.application, 'register').and.returnValue(Promise.resolve());

        await controllerWrapper.init(config);
        controllerWrapper._openApp("foo");

        expect(mockSubscriptions.show).toHaveBeenCalledWith(
            "appId",
            {
                title: "appTitle",
                icon: "headerLogo"
            },
            "appServiceName",
            "appEntryPoint",
            {
                canFloat: true
            }
        );
        expect(mockSubscriptions.focus).toHaveBeenCalledWith("appId");
    });
});