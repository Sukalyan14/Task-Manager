const mongoose = require('mongoose')

const connectionString = `mongodb+srv://sukalyan:sn414@expressprojects.81fh4be.mongodb.net/TASK-MANAGER-PROJECT?retryWrites=true&w=majority`

const connectDB = (url) => {
    return mongoose.connect(connectionString , {
    useNewUrlParser:true,
    useCreateIndex:true,
    useFindAndModify:true,
    useUnifiedTopology:true
    })
}

module.exports = connectDB
    // .then(() => console.log("connected to DB..."))
    // .catch((err) => console.log(err))