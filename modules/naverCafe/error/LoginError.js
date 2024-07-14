module.exports = (function() {

    /**
     * 
     * @param {string} message - error Message
     * @returns {object} - error object
     */

    function LoginError(message) {
        try{
            naverLoginError();
        }catch (err) {
            err.name = "LoginError";
            err.message = message;
            return err;
        }
    }

    return LoginError
})()

