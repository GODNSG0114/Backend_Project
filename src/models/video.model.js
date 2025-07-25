import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";


const videoSchema = new Schema({

    
        videoFile:{
            type: String,   // cloudanary URL
            required: true
        },
        Thumbnail :{
             type: String,   // cloudanary URL
            required: true
        },
        title :{
             type: String,  
            required: true
        },
        Discription:{
             type: String,  
            required: true
        },
       duration:{
             type: Number,   // cloudanary URL
             required: true
        },
        view :{
            type: Number,
            default : 0
        },
        isPublished:{
            type : Boolean,
            default : true
        },
        Owner:{
            type : Schema.Types.ObjectId,
            ref:"User"
        }
        
     


},{timestamps:true})


videoSchema.plugin(mongooseAggregatePaginate)
export default Video = mongoose.model("Video" , videoSchema);