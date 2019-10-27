# Router for Alexa Skill Kit SDK v2

![Min Node Version](https://img.shields.io/node/v/ask-sdk-router.svg?style=flat)
[![Build Status](https://travis-ci.com/fremail/ask-sdk-router.svg?branch=master)](https://travis-ci.com/fremail/ask-sdk-router)
[![Code Coverage](https://img.shields.io/codecov/c/github/fremail/ask-sdk-router.svg?style=flat)](https://codecov.io/gh/fremail/ask-sdk-router)
![Vulnerabilities](https://img.shields.io/snyk/vulnerabilities/github/fremail/ask-sdk-router/package.json.svg?style=flat)
![License](https://img.shields.io/github/license/fremail/ask-sdk-router.svg)

_When you need more than you have._

This library extends the routing in Alexa Skill Kit SDK v2. It has several simple methods to manage the process of request handling.

In two words, it tests canHandle() function of each request handler - does the same as built-in ASk SDK routing, but with methods to go to the next suitable handler or restart routing.

Please see [CHANGELOG](CHANGELOG.md) and make sure to read [UPGRADING](UPGRADING.md) when upgrading from a previous version.

## Installation

```bash
npm i --save ask-sdk-router
```

## Usage

Init Router with object containing all your request handlers. Very close to way you did it in skillBuilder.addRequestHandlers(), but you have to wrap all the items in one object.

```javascript
const Router = require('ask-sdk-router');

const router = new Router({
  // list your request handlers here like you did it in skillBuilder.addRequestHandlers()
  SessionEndedRequestHandler,
  CancelIntentHandler,
  HelpIntentHandler,
  FallbackHandler,
  // also you can use another syntax for the object
  'CrazyJump': CrazyJumpHandler,
  10: TenthHandler,
});

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

### Jump to selected request handler (from v2.0.0)

```javascript
// jump to CancelIntentHandler without canHandle test
return await router.jumpTo(handlerInput, 'CancelIntentHandler');

// jump to CrazyJumpHandler only if canHandle returns true, otherwise jumpTo() will return false
return await router.jumpTo(handlerInput, 'CrazyJump', true);
```

