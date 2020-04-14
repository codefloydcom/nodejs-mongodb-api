# Mongo DB API with Mangoose

>Backend API for Mongo DB. Solution demonstrates mongoose implementation.

## Usage

- [Installation and configuration](documentation/installation.md#installation-and-configuration)
    - [Node initialization](documentation/installation.md#node-initialization)
    - [Express and dotenv initialization](documentation/installation.md#express-and-dotenv-initialization)
    - [Nodemon (Node watch run)](documentation/installation.md#nodemon-node-watch-run)
    - [Morgan (Logger)](documentation/installation.md#morgan-logger)
    - [Colors (make command line colored)](documentation/installation.md#colors-make-command-line-colored)
    - [Express-fileupload](documentation/installation.md#express-fileupload)
    - [Mongoose](documentation/installation.md#mongoose)
- [Express documentation](documentation/express.md#express-documentation)
    - [Initialization](documentation/express.md#Initialization)
    - [Middleware](documentation/express.md#Middleware)
    - [Controllers](documentation/express.md#Controllers)
    - [Routes](documentation/express.md#Routes)
    - [Express exception handler](documentation/express.md#Express-exception-handler)
- [Mongoose documentation](documentation/mongoose.md#mongoose-documentation)
    - [Models](documentation/mongoose.md#models)
    - [Hooks](documentation/mongoose.md#hooks)
    - [Reference](documentation/mongoose.md#reference)
    - [Virtual reference](documentation/mongoose.md#Virtual-reference)
- [Authentication](documentation/auth.md#authentication)
    - [Custom JWT](documentation/auth.md#custom-jwt)
    - [Auth0, Azure AD](documentation/auth.md#auth0-azure-ad)
    - [No auth](documentation/auth.md#no-auth)


## Install Dependencies

```
npm install
```

## Run App

```
# Run in dev mode without security
npm run dev

# Run in dev mode with security model
npm run dev-auth0 / dev-jwt / dev-azure

# Run in prod mode
npm start
```

## About
- Version: 1.0.0
- License: MIT
- Author: Dmitry Pustarnak
- Web: codefloyd.com

[[To top]](/readme.md#Mongo-DB-API-based-with-Mangoose)