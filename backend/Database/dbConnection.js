const mongoose = require("mongoose");

const dbConnection = ()=>{
    mongoose.connect(process.env.MONGODB_URL,{
        dbName:"JOB_PORTAL",
    })
    .then(()=>{
        console.log("Connected to Database !!!")
    })
    .catch((err)=>{
        console.log(`Error while connectiong to database: ${err}`)
    })
}


module.exports = dbConnection