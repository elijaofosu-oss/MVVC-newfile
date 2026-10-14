// Import Express
const express = require('express')
const router = require('./router/userRouter');
const logger = require('./middlesware/logger')

//  Intialize Express
const app = express();


app.use(logger)
app.use(express.json())
app.use(router)

app.listen(9000, ()=> {
    console.log('server is running on PORT: 9000')
}) 

