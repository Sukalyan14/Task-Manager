const asyncWrapper = (fn) => {
    return async(req , res , next) => {
        try{
            await fn(req , res , next)
        } catch(error){
            next(error)  //When any error is encountered here it is passed on to errorHandler Middleware or error-handler.js
        }
    }
}

module.exports = asyncWrapper