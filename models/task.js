const moongose = require('mongoose');

const TaskSchema = new moongose.Schema({
    title:{
        type: String,
        required: [true, 'must provide name'],
        trim: true,
        maxlength: [20, 'name can not be more than 20 characters'],
    },
    description: {
        type: String,
    },
    date: {
        type: String,
    },
    priority: {
        type: String,
        enum:{
            values:['high', 'normal', 'low'],
            message: '{VALUE} is not supported',
        },
    },
    dateValue: {
        type: Number,
        required:  [true, 'must provide deadline'],
    },
    priorityNumber: {
        type: Number
    },
    done: {
        type:Boolean,
        default: false
    }

});

module.exports = moongose.model('Tasks', TaskSchema);