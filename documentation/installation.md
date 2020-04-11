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
[[Main]](/readme.md#usage)


# Usage
```
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
[[Main]](/readme.md#usage)

[[Top]](/documentation/installation.md#Installation-and-configuration)