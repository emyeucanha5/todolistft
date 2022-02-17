const express = require('express');
const {
    getAllTasks,
    getTask,
    createNewTask,
    deleteTask,
    updateTask,
    replaceTask,
} = require('../controller/task');
const router = express.Router();



router.route('/').get(getAllTasks).post(createNewTask);
router.route('/:id').get(getTask).delete(deleteTask).patch(updateTask).put(replaceTask);

module.exports = router; 