//Packages , imports and ports
const express = require('express')
const tasks = require("./router/tasks")
const connectDB = require('./db/connect')
const notFound = require('./middleware/not-found')
const errorHandlerMiddleWare = require('./middleware/error-handler')
require('dotenv').config()

const port = 3000

//middleware
const app = express();

app.use(express.static('./public'))
app.use(express.json())

app.use('/api/v1/tasks' , tasks)

app.use(notFound)

app.use(errorHandlerMiddleWare)  
//Server starter and db connection
const start = async () => {
    try{
        await connectDB(process.env.MONGO_URI)
        app.listen(port , console.log(`Server Listening at port ${port}...`))
    }
    catch(error){
        console.log(error)
    }
}

start()

// app.get('/api/v1/tasks') -- get all tasks
// app.post('/api/v1/tasks') -- create a new tasks
// app.get('/api/v1/tasks/:id') -- get a single tasks
// app.patch('/api/v1/tasks/:id') -- update a task
// app.delete('/api/v1/tasks/:id') -- delete a task