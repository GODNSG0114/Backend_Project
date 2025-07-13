// require('dotenv').config({path: './env'})
import dotenv from 'dotenv'
import connectDB from './db/index.js'
import app from "./app.js"
dotenv.config(
    {
        path : './env'
    });
    
    // 1st way to connect mongooDB : connection from another file and exported in 1st executed file of project       
connectDB()
.then(()=>{
      app.on('error' , (error)=>{
        console.log("error from express after DB connect (src/index)");
        throw error;
      })

       app.listen(process.env.PORT ||  8000  ,()=>{
          console.log(`server is running at port : ${process.env.PORT}`)
       })
})
.catch( (error)=>{
    console.log("mongoDB connection is FAILED (src/index) " , error);
})




         // 2nd way to connect MongooDB : Direct connection in 1st executed file of project

/*
import mongoose, { connect } from "mongoose";
import { DB_NAME } from './constants';
import express from "express";
const app = express();
async function connectDB() {
    try {
        await mongoose.connect(`${process.env.MONGOODB_URI}/${DB_NAME}`);
        app.on('error', (error) => {
            console.log("EROOR: DB connected BUT App is not listening DB", error);
            throw error;
        })

        app.listen(process.env.PORT, () => {
            console.log(`App is listening on port ${process.env.PORT}`);
        })

    } catch (error) {
        console.log("ERROR: ", error);
    }
}  
connectDB()
*/