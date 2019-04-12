
class Router {
    constructor(handlers) {
        this.handlers = handlers;
        this.init();
    }

    init() {
        this.handlerKeys = Object.keys(this.handlers).reverse();
        this.currentHandlerKey = null;
        this.noHandler = true;
    }

    /**
     * Call this function to jump to the next applicable handler
     * @param handlerInput
     * @return {Promise<*>} Returns false in case of no applicable handlers
     */
    async next(handlerInput) {
        if (this.handlerKeys.length === 0) {
            if (this.noHandler) {
                console.log('Router: no request handler found');
            }
            return false;
        }
        this.currentHandlerKey = this.handlerKeys.pop();
        const handler = this.handlers[this.currentHandlerKey];
        if (await handler.canHandle(handlerInput)) {
            this.noHandler = false;
            return await handler.handle(handlerInput);
        } else {
            return await this.next(handlerInput);
        }
    }

    /**
     * Restart routing from the first request handler
     * @param handlerInput
     * @return {Promise<*>}
     */
    async restart(handlerInput) {
        this.init();
        return await this.next(handlerInput);
    }

    /**
     * Jump to selected request handler
     * @param handlerInput
     * @param {string|symbol|int} key jump to the handler with selected key
     * @param {boolean} check set to true if you need to test it with canHandle()
     * @returns {Promise<boolean|*>}
     */
    async jumpTo(handlerInput, key, check = false) {
        this.init();
        const index = this.handlerKeys.indexOf(key);
        if (index === -1) {
            console.log(`Router: no request handler found with key "${key}"`);
            return false;
        }
        this.handlerKeys = this.handlerKeys.slice(0, index);
        this.currentHandlerKey = key;
        const handler = this.handlers[this.currentHandlerKey];
        if (check && await handler.canHandle(handlerInput)) {
            return false;
        }
        this.noHandler = false;
        return await handler.handle(handlerInput);
    }

    /**
     * Export router to addRequestHandlers() function
     * @return {{canHandle: (function(): boolean), handle: (function(*=): Promise<*>)}}
     */
    handle() {
        return {
            canHandle: () => true,
            handle: (handlerInput) => this.restart(handlerInput),
        };
    }

    /**
     * Inject the router to request attributes using addRequestInterceptors() function
     */
    interceptor() {
        return {
            process: (handlerInput) => {
                const attributes = handlerInput.attributesManager.getRequestAttributes();
                attributes.router = this;
                handlerInput.attributesManager.setRequestAttributes(attributes);
            }
        };
    }
}

module.exports = Router;
