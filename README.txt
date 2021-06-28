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