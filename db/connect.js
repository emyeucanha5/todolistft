const moongose = require('mongoose');


const connectDB = (url) => {
    moongose.connect(url,
        {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
            useUnifiedTopology: true,
        })
}


module.exports = connectDB;