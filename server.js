const express = require('express')
const cors = require('cors')

const  connection  = require('./config/db')
const userRouter = require('./routes/user.router')

const app = express();

app.use(express.json())

app.use(cors())

app.use('/users', userRouter)

app.listen(8000, async()=> {

    try{
        await connection;
        console.log("Connected to DataBase Successfully")
    }
    catch(err)
    {
        console.log("Error while connecting to DB");
    }

    console.log('Server is running on Port 8000');
})