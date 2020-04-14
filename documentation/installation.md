# Installation and configuration

This section represent all installed packages, documentations and quick examples of it implementations



## Node initialization
```
npm init
```
[[Main]](/readme.md#usage)


## Express and dotenv initialization
>Documentation for [dotenv](https://github.com/motdotla/dotenv)
```
npm i express dotenv
```
[[Main]](/readme.md#usage)


## Nodemon (Node watch run)
```
npm i -D nodemon
```
```
# Package.json

"scripts": {
    "start": "NODE_ENV=production node server",
    "dev": "nodemon server"
  }
```  
```
# Usage

npm run dev
```
[[Main]](/readme.md#usage)


## Morgan (Logger)
>Documentation for [morgan](https://github.com/expressjs/morgan)
```
npm i morgan
```
```
# Usage

if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}
```
[[Main]](/readme.md#usage)


## Colors (make command line colored)
>Documentation for [colors.js](https://www.npmjs.com/package/colors)
```
npm i colors
```
```
# Usage

console.log('Test string'.yellow.bold.underline);
```
[[Main]](/readme.md#usage)


## Express-fileupload
>Documentation for [Express-fileupload](https://github.com/richardgirges/express-fileupload)
```
npm i express-fileupload
```
```
# Usage

app.use(fileupload());
```
[[Main]](/readme.md#usage)


## Mongoose
>API documentation for [mongoose](https://mongoosejs.com)
```
npm i mongoose
```

## Security
>API documentation for [sanitize](https://github.com/blargism/express-mongo-sanitize). To prevent a search in user schema by "email" : {"$gt":""} request

```
npm i express-mongo-sanitize
```

>API documentation for [helmet](https://helmetjs.github.io). Secure config headers in request. See more in documentation.

```
npm i helmet
```
>API documentation for [xss-clean](https://github.com/jsonmaur/xss-clean). To prevent passing script tags in request. See more in documentation.

```
npm i xss-clean
```
>API documentation for [rate-limit](https://github.com/nfriedly/express-rate-limit). Limit requests to API server. See more in documentation.

```
npm i express-rate-limit
```
>API documentation for [hpp](https://github.com/analog-nico/hpp). Prevent polution attacks. See more in documentation.

```
npm i hpp
```
>API documentation for [CORS](https://github.com/expressjs/cors). See more in documentation.

```
npm i cors
```

[[Main]](/readme.md#usage)

[[Top]](/documentation/installation.md#Installation-and-configuration)