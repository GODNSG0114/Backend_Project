import mongoose ,{Schema} from "mongoose"

const subsciptionSchema = new Schema({
   subscriber :{
    type : Schema.Types.ObjectId,  // one who subscribing
    ref : "User"
   },
    channel :{
       type : Schema.Types.ObjectId,  // one who created channel
       ref : "User" 
    }
},{timestamps: true})

export const Subscription = mongoose.model("Subscription" ,subsciptionSchema);