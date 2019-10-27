const Router = require('../index')

describe('Router interceptor', () => {
    it('should add router to request attributes when process method called', () => {
        const router = new Router({});
        const interceptor = router.interceptor();
        const handlerInput = {
            attributesManager: {
                getRequestAttributes: () => ({}),
                setRequestAttributes: jest.fn()
            }
        };

        interceptor.process(handlerInput);
        
        expect(handlerInput.attributesManager.setRequestAttributes).toBeCalledWith({
            router: router
        });
    });
})