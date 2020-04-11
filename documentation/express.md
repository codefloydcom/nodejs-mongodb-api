# Express documentation

This section represent node.js express package implementation.

## Initialization

```
const app = express();
```
[[Main]](/readme.md#usage)

## Middleware

```
app.use((req, res, next) => {
    ...
    next();
});
```
All custom middlewares should call ***_next()_*** to tell nodejs to move to next middleware.

- async.js
    > contains middleware to replace try/catch block repetition in controllers
    ```
    # Usage

    export.controller = asyncHandler(async (req, res, next) => {
    };
    ```
- error.js
    > contains controller error handler from catch block
    ```
    # Usage

    app.use(errorHandler);
    ```
- logger.js
    > custom logger of called routes into command line
    ```
    # Usage 

    const logger = require('./middleware/logger');
    # not used
    ```
- extendedResults.js
    > middleware for fluent API implements generic logic to use $gt,$gte,limit etc for specified route
    ```
    # routes
    router.route('/')
            .get(extendedResults(Item, 'item'), getItems);
    
    # controllers
    res.status(200).json(res.extendedResults);

    # API call
    https://server/route?limit=3&select=att1,attr2&number[gt]=1000
    ``` 
[[Main]](/readme.md#usage)

## Controllers
Application consists from parent and child controllers

```
# Usage

await Item.findById(req.params.id);
# req.params.id - id comming from route

await Item.create(req.body);
# req.body - attached body by post request

req.files.file;
# express-fileupload middleware catch attached files in API calls
```
[[Main]](/readme.md#usage)

## Routes
Application used two routes to split parent and child controllers

- mongoitems.js 
    > parent route for '/' calls
    ```
    #route without passed params on API call
    router.route('/')
        .get(controller)
        .post(controller)
        .putcontroller)
        .delete(controller);
    
    #route with passed 'id' param on API call
    router.route('/:id') 
        ...

    # Middleware to re-route following API calls to child route
    router.use('/:itemId/subitems', subItemRouter);
    ```
- mongosubitems.js
    > child route to handle '/subitems/' calls
    ```
    # Constructor used to get parent's params from call such as parentId
    const router = express.Router({ mergeParams: true });
    ```
[[Main]](/readme.md#usage)

## Express exception handler
```
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`.red);
    server.close(()=>process.exit(1));
})
```
On unhandled exception - log an error and shutdown a server

[[Main]](/readme.md#usage)

[[Top]](/documentation/express.md#Express-documentation)