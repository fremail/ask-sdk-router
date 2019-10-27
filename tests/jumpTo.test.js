const Router = require('../index')

describe('Router jumpTo', () => {
    it('should return false when there is no handler with given key', async () => {
        const router = new Router({});

        const result = await router.jumpTo({}, "Missing");

        expect(result).toBe(false);
    })

    it('should return false when check enabled and canHandle returns false', async () => {
        const Handler = {
            canHandle: () => false
        };

        const router = new Router({Handler});

        const result = await router.jumpTo({}, "Handler", true);

        expect(result).toBe(false);
    });

    it('should call handle method when check disabled', async () => {
        const Handler = {
            handle: jest.fn()
        };

        const router = new Router({Handler});

        await router.jumpTo({}, "Handler", false);

        expect(Handler.handle).toBeCalled();
        expect(router.currentHandlerKey).toBe("Handler");
        expect(router.handlerKeys.length).toBe(0);
    });

    it('should call handle method when check enabled and canHandle returns true', async () => {
        const Handler = {
            canHandle: () => true,
            handle: jest.fn()
        };

        const router = new Router({Handler});

        await router.jumpTo({}, "Handler", false);

        expect(Handler.handle).toBeCalled();
        expect(router.currentHandlerKey).toBe("Handler");
        expect(router.handlerKeys.length).toBe(0);
        expect(router.noHandler).toBe(false);
    });
})