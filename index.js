
class Router {
    constructor(...handlers) {
        this.handlers = handlers;
        this.currentIndex = -1;
        this.noHandler = true;
    }

    /**
     * Call this function to jump to the next applicable handler
     * @param handlerInput
     * @return {Promise<*>} Returns false in case of no applicable handlers
     */
    async next(handlerInput) {
        if (this.handlers.length <= this.currentIndex + 1) {
            if (this.noHandler) {
                console.log('Router: no request handler found');
            }
            return false;
        }
        this.currentIndex++;
        const handler = this.handlers[this.currentIndex];
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
        this.currentIndex = -1;
        this.noHandler = true;
        return await this.next(handlerInput);
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
