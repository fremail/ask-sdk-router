# Upgrading Router for Alexa Skill Kit SDK v2

## Upgrading to v2.0.0

Init Router with **object** containing all your request handlers.

Before:

```javascript
const router = new Router(
  // list your request handlers here like you did it in skillBuilder.addRequestHandlers()
  SessionEndedRequestHandler,
  CancelIntentHandler,
  HelpIntentHandler,
  FallbackHandler,
);
```

After:

```javascript
const router = new Router({
  // list your request handlers here like you did it in skillBuilder.addRequestHandlers()
  SessionEndedRequestHandler,
  CancelIntentHandler,
  HelpIntentHandler,
  FallbackHandler,
});
```

After that update you can use `jumpTo()`. This code will jump to HelpIntentHandler.

```javascript
return await router.jumpTo(handlerInput, 'HelpIntentHandler');
```


