const Router = require('../index')

describe('Router restart', () => {
    it('should call init on restart', async () => {
        const router = new Router({});
        const handlerInput = {};

        const initSpy = jest.spyOn(router, 'init');

        await router.restart(handlerInput);

        expect(initSpy).toBeCalled();
    });

    it('should call next on restart', async () => {
        const router = new Router({});
        const handlerInput = {};

        const initSpy = jest.spyOn(router, 'next');

        await router.restart(handlerInput);

        expect(initSpy).toBeCalledWith(handlerInput);
    });
})