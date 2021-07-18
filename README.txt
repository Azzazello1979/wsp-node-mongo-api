package.json scripts...

"scripts": {
    "start": "node app.js",
    "dev": "npx nodemon app.js",
    "test": "echo \"Error: no test specified\" && exit 1"
},

npm start works (its a shortcut for npm run start), but thats the only one
all additional script can be run like this:

npm run start
npm run dev

-------------------------------------------------------------------------
res.status(400) ... cannot chain json() nor send() after this

----------------------------------------------------------------------------------------------------
Create the model using mongoose.model() in the same file where you defined the schema for the model.

1. create schema (shape of the document)
2. create model from the schema
    ... now you can add your own methods to the model (the model is not only the data but it is also
    the methods that work on that data)
3. export the model

Export the whole model.
