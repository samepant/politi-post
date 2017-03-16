app for sending postcard to your rep and senators. using lob, stripe and next.js.

TO RUN LOCALLY:

clone the repo then run

`npm install`

Make sure you are running mongodb locally, then run:
`node databaseSetup/addPostcard.js`
^this adds postcard templates to your database.

to run the app you will need a `secret.js` file that exports an object with the following keys:
```
module.exports = {
  'mongoURI': '',
  'lobAPIKey': '',
  'liveLobKey': '',
  'stripeTestSecret': '',
  'stripeSecret': '',
  'nodemailerSecretKey': ''
}
```
reach out if you want to use my test keys – im on keybase :)

then after all that is done, run:
`npm run dev`

and it should start up.


to do:
- routing based on postcard designs (so people can link to a specific postcard)
- sorting and searching of postcards by issue statement
- local mailing addresses of congress people
- FAX ?????


