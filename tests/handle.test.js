const Router = require('../index')

describe('Router handle', () => {
    it('should return a proper handler object', () => {
        const router = new Router({});
        const handler = router.handle();

        expect(handler.canHandle).toBeDefined();
        expect(handler.handle).toBeDefined();
        expect(typeof handler.canHandle).toBe('function');
        expect(typeof handler.handle).toBe('function');
    });

    it('should be always able to call handle method', () => {
        const router = new Router({});
        const handler = router.handle();

        expect(handler.canHandle()).toBe(true);
    });

    it('should call restart method when handler executed', () => {
        const router = new Router({});
        const restartStub = jest.spyOn(router, 'restart');
        const handler = router.handle();
        const handlerInput = {};

        handler.handle(handlerInput);

        expect(restartStub).toBeCalledWith(handlerInput);
    });
})