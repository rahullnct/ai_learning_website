

const ErrorHandler=(err,req,res,next)=>{
    let statusCode=err.statusCode || 400;
    let message=err.message || "Server Error";

    // mongoose bad object ID
    if(err.name === "CaseError"){
        message="resource Not Found";
        statusCode=404;
    }
    if(err.code===11000){
        const feild=Object.keys(err.keyValue)[0];
        message=`${feild} already exits`;
    }
    if(err.name === "Validation Error"){
        message=Object.values(err.errors).map(val=> val.message).json(', ');
        statusCode=400;
    }
    if(err.code === 'LIMIT_FILE_SIZE'){
        message="file size exceed the maximum limit of 10MB";
        statusCode=400;
    }
    if(err.name === "JsonWebToken"){
        message="Invalid error";
        statusCode=401;
    }
    if(err.name === "TokenExpiredError"){
        message="Token Expired";
        statusCode=401;
    }
    console.error('Errors',{
        message:err.message,
        // Stack:process.env.NODE_ENV === 'development' && {err.Stack:undefined}
        
    })
    res.status(statusCode).json({
        success:false,
        err:message,
        statusCode,
        // ...ErrorHandler(process.env.NODE_ENV === 'development' && {Stack:err.Stack})
    })
}
export default ErrorHandler;