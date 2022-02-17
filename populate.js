require('dotenv').config();


const connectDB = require('./db/connect');

const Tasks = require('./models/task');
const jsonProducts = require('./tasks.json');



const start = async() =>{
    try {
        await connectDB(process.env.MONGO_URL);
        await Tasks.deleteMany()
        await Tasks.create(jsonProducts);
        console.log(Tasks);   
        process.exit(0);
    } catch (error) {
        console.log(error);
        // process.exit(1);
    }
}


start();