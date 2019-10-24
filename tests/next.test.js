const Router = require('../index')

describe('Router next', () => {
    it('should return false when there is no handler', async () => {
        const router = new Router({});

        const result = await router.next({});

        expect(result).toBe(false);
    })

    it('should call canHandle method when there is handler defined', async () => {
        const Handler = {
            canHandle: jest.fn()
        };
        const router = new Router({Handler});

        await router.next({});

        expect(Handler.canHandle).toBeCalled();
    })

    it('should call handle method when canHandle returns true', async () => {
        const Handler = {
            canHandle: () => true,
            handle: jest.fn()
        };

        const router = new Router({Handler});

        await router.next({});

        expect(Handler.handle).toBeCalled();
        expect(router.currentHandlerKey).toBe("Handler");
    })

    it('should not call handle method when canHandle returns false', async () => {
        const Handler = {
            canHandle: () => false,
            handle: jest.fn()
        };

        const router = new Router({Handler});

        await router.next({});

        expect(Handler.handle).not.toBeCalled();
        expect(router.currentHandlerKey).toBe("Handler");
    })
})