const asynHandler  = (( requestHandler)=>{
      (req,res,next)=>{
        Promise.resolve(requestHandler(req,res,next))
        .catch((error)=>next(err))
      }
})


export default asynHandler;

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
 