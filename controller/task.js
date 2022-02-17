const Task = require('../models/Task');
const asyncWrapper = require('../middleware/async')





const getAllTasks = asyncWrapper(async(req,res) => {
    const tasks = await Task.find({});
    res.status(201).json({tasks});
});

const createNewTask = asyncWrapper( async(req,res) => {
    const task = await Task.create(req.body);
    console.log(task);
    res.status(201).json({ task });  
});
const getTask = asyncWrapper( async(req,res) => {
    const id = req.params.id;
    const task = await Task.findOne({_id:id});
    console.log(id);
    res.status(201).json({task});
} )
const deleteTask = asyncWrapper( async(req,res) => {
    const id = req.params.id;
    const task = await Task.findOneAndDelete({_id: id});
    console.log("HIII");
    if (!task) {
        return next(createNewCustomAPiError(`No task with id : ${req.params.id}`, 404));
    }
    res.status(201).json({ task });
});

const updateTask = asyncWrapper(async(req,res) => {
    const task = await Task.findOneAndUpdate({_id: req.params.id},{ $set: req.body}, {
        new: true,
        runValidators: true,
    });
    if (!task) {
        return next(createNewCustomAPiError(`No task with id : ${req.params.id}`, 404));
    }
    res.status(201).json({ task });
});

const replaceTask = asyncWrapper(async(req,res) => {
    const task = await Task.findOneAndUpdate({_id: req.params.id},{ $set: req.body}, {
        new: true,
        runValidators: true,
    });
    if (!task) {
        return next(createNewCustomAPiError(`No task with id : ${req.params.id}`, 404));
    }
    res.status(201).json({ task });
})
module.exports = {
    getAllTasks,
    getTask,
    createNewTask,
    deleteTask,
    updateTask,
    replaceTask,

}