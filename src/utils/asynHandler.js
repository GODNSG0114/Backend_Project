const asynHandler  = (requestHandler)=> {
         return (req,res,next)=>{ 
         Promise.resolve(requestHandler(req,res,next))
        .catch((error)=>next(error))
      }
}


export  {asynHandler};

 ////// 2nd method  ///////////////////////////////

// const asynHandler = (func) = async(err , req,res ,next) =>{
//     try {
//        await func(req ,res ,next); 
//     } catch (error) {
//         res.status(err.code || 500).json({
//             success : false,
//             message : err.message
//         })
//     }
// }
 