# Router for Alexa Skill Kit SDK v2

_When you need more than you have._

This library extends the routing in Alexa Skill Kit SDK v2. It has several simple methods to manage the process of request handling.

In two words, it tests canHandle() function of each request handler - does the same as built-in ASk SDK routing, but with methods to go to the next suitable handler or restart routing.

## Installation

```bash
npm i ask-sdk-router
```

## Usage

Init Router with all your request handlers like you did it in skillBuilder.addRequestHandlers()

```javascript
const Router = require('ask-sdk-router');

const router = new Router(
  // list your request handlers here like you did it in skillBuilder.addRequestHandlers()
  SessionEndedRequestHandler,
  CancelIntentHandler,
  HelpIntentHandler,
  FallbackHandler,
);

exports.handler = skillBuilder
  .addRequestHandlers(router.handle())
  .addRequestInterceptors(router.interceptor())
  .lambda();
```

Now you can use the router in any part of your skill! The router is stored in request attributes with `router` key.

```javascript
const router = handlerInput.attributesManager.getRequestAttributes().router;
return await router.next(handlerInput);
```

## What router can do?

### Go to next suitable request handler

```javascript
return await router.next(handlerInput);
```

### Go to first suitable request handler from beginning

```javascript
return await router.restart(handlerInput);
```
