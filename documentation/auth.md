# Authentication

This section describes authentication.
- Custom JWT
```
npm run dev-jwt
```
- Auth0
```
npm run dev-auth0
```
- Azure AD
```
npm run dev-azure
```
- No auth (only API usage)
```
npm run dev
```
Authentication implemented under ___/auth___ folder

## Custom JWT

Location :__/auth/jwt/__

### Middleware

>***Protect*** middleware checks if user has a valid JWT bearer token to access route.

>***Authorize*** middleware checks if user has a certain role to access a particular route.

```
# Dependencies: 

npm i bcryptjs

npm i jsonwebtoken

npm i cookie-parser
```

Validation against private key (pk stored in config). User instance retrieved from mongoDB.

### Routes

> Route used to handle "user's" schema

### Models

> matchPassword, getSignedJwtToken both are static methods implemented in route, used to dry controller and generalize a logic

- ___On pre save hook___ - encrypt password using bcrypt library

- ___matchPassword___ used to compare entered password with encrypted (stored) one
- ___getSignedJwtToken___ - issuer of JWT with Document ID (which is user id) and secret (to validate token).

> password field unselectable ___select : false___

### Contollers

- ___sendTokenResponse function__ generates JWT token by calling static function from User schema, generates cookie, send respond with JWT and cookie

[[Main]](/readme.md#usage)
## Auth0, Azure AD

```
# Dependencies: 

npm i express-jwt

npm i jwks-rsa
```

```
# Implementation 1:

exports.protect  = jwt({ ... });
# Middleware injected to certain routes to validate an access
```
```
# Implementation 2:

app.use(jwt({ ... }));
# Middleware injected to app to handle all routes
```
- ___.unless(["/"])___ - used to exclude certain routes

- ___credentialsRequired: false___ - option of jwt constructor to allow non authorize access 

- ___exports.protect = (req, res, next) => { if(!req.user) { return next(err); } };___ - middleware for custom check is user has access for certain route.

- ___if(err.name === 'UnauthorizedError') { }___ - error middleware configured to retrieve custom error messages

#### Not implemented
> exports.authorize = (...roles) =>  (req, res, next) => next();

___exports.authorize___  should check if user has a required role (passed from route middleware) to access particular route. Roles (claims) attached in req.user and stored in 3rd party provider. If role not exist under claim - application should retrive bad request (see custom jwt implementation).

> For Auth0 -> Rules should be configured so that claims will include roles.

Solution controllers should be changed in a way to check user validation against 3rd party server instead of Mongo User Schema which wont be exist in this implementation.

#### Alternative approach

This approach can be integrated to ***Custom JWT*** flow.

> Documentation for AZURE OpenID [link](https://docs.microsoft.com/en-us/azure/active-directory/develop/v2-protocols-oidc)

```
Tenant config

https://login.microsoftonline.com/{tenantName}.onmicrosoft.com/.well-known/openid-configuration

jwksUri

https://login.microsoftonline.com/common/discovery/keys
```
> General implementation
```
const jwt = require('jsonwebtoken');
const key = '-----BEGIN CERTIFICATE-----\n{publicKey}\n-----END CERTIFICATE-----'
const token = bearerToken;
const decoded = jwt.verify(token, key);
```
> Explanation
1. Bearer token can be decrypted by https://jwt.io to extract header and payload
```
# Bearer token

Header:
{
  "alg": "RS256",
  "typ": "JWT",
  "kid": "ZzbpeoYCdDkJwTs40lxGI"
}

Payload:
{
  "iss": "https://mo...",
  "sub": "fddtLSOSu...",
  "aud": "co...",
  "iat": 1586809114,
  "exp": 1586895514,
  "azp": "fddtLSO....,
  "gty": "client-credentials"
}
```
2. Token should matches jwksUri json by "kid" as first. Additionally audience and issuer can be validated. If signature matches - "x5c" field from jwksUri can be retrieved and passed as a "publicKey".
```
#jwksUri

keys: [
  {
    kty: "RSA",
    use: "sig",
    kid: "YMELHT0gvb0mxoSDoYfomjqfjYU",
    x5t: "YMELHT0gvb0mxoSDoYfomjqfjYU",
    n: "ni9S....",
    e: "AQAB",
    x5c: [
    "MIIDB...z"
    ]
  },
...
```

3. Validation between public key and bearer token. If valid - user claim will be retrieved. 

[[Main]](/readme.md#usage)

## No auth

> "No auth" implements dummy routes to do not break a flow of application

> On auth remove any presents of "switcher" should be removed, controllers should be adjusted not to check "user db" instance. 

[[Main]](/readme.md#usage)

[[To top]](#Authentication)