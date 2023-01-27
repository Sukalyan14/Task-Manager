const Tasks = require('../models/Tasks')
const asyncWrapper = require('../middleware/async')
const { createCustomError } = require('../errors/custom-error')

const getAllTasks = asyncWrapper( async (req , res) => {
        const tasks = await Tasks.find({})
        res.status(200).json({ tasks })
        // res.status(200).json({ tasks,amount:tasks.length })
        // res.status(200).json({ success:true , data: {tasks} })
})

const createTasks = asyncWrapper( async (req , res) => {
    // res.send('Create Task')
    // const task = await Task.create({ name: "Something" , completed:true }) //values given in Task.create has to be in the same format as set in schema(Task.js)
    const task = await Tasks.create(req.body)
    res.status(201).json({ task })  
})

const getTasks = asyncWrapper( async (req , res , next) => {
        const { id:taskID } = req.params
        const task = await Tasks.findOne({_id:taskID})
        if(!task){
            return next(createCustomError(`No task in the id: ${taskID}` , 404))
            // const error = new Error('Not Found') //JS error constructor
            // error.status = 404
            // return next(error)
            // return res.status(404).json({msg:`No task in the id: ${taskID}`})
        }
        res.status(200).json({ task })
    
})

const updateTasks = asyncWrapper( async (req , res , next) => {
    
        const { id:taskID }  = req.params
        
        const task = await Tasks.findOneAndUpdate({ _id:taskID} , req.body , {
            new:true,   //For seeing the updated value in response
            runValidators:true //For preventing empty values in req
        })
        if(!task){
            return next(createCustomError(`No task in the id: ${taskID}` , 404))
        }
        res.status(200).json({ task })
})

const deleteTasks = asyncWrapper( async (req , res , next) => {
        const { id:taskID } = req.params
        const task = await Tasks.findOneAndDelete({_id:taskID})
        if(!task){
            return next(createCustomError(`No task in the id: ${taskID}` , 404))
        }
        res.status(200).json({ task })
})

module.exports = {
    getAllTasks,
    createTasks,
    getTasks,
    updateTasks,
    deleteTasks
}