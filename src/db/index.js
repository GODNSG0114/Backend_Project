import mongoose from "mongoose";
import { DB_NAME } from '../constants.js';
import express from "express";
const app = express();

const connectDB = async()=>{
       try{
          const connectionInstance = await mongoose.connect(`${process.env.MONGOODB_URI}/${DB_NAME}`);   // check
          console.log(`\n MongoDB connect !! DB HOST: ${connectionInstance.connection.host}`);
        }
       catch{
        console.log(`Error: ${error}`);
        process.exit(1);
       }
}


export default connectDB;