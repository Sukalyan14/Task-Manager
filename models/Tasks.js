const mongoose = require('mongoose')

const TaskSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true , 'must have a value'],
        trim:true,
        maxlength:[20,'name cant be more than 20']
    },
    completed:{
        type:Boolean,
        default:false
    }
})

module.exports = mongoose.model('Task' , TaskSchema)