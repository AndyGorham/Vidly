// Universal error handler that takes in the Express route and returns it again if successful or passes
// execution on with an exceptoin if not.
module.exports = function (handler){
    return async (req, res, next) => {
        try {
            await handler(req, res);
        }
        catch(ex){
            next(ex);
        }
    }

}