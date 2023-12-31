const express = require('express');
const path = require('path');

const app = express();
const recipesAPI = require('./server/api')
app.use(express.static(path.join(__dirname, 'dist')))
app.use(express.static(path.join(__dirname, 'node_modules')))

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/', recipesAPI)



const PORT = 3000; 
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
});




    