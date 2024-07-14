let request = require("../request")
let LoginError = require("../error/LoginError")

module.exports = (function(){

    /**
     * @param {number} cafeId
     * @returns {object}
     */
    function getMyInfo(cafeId){
        if(this.cookies == null) throw new LoginError("login cookies are missing. (= not login)")
        let data = JSON.parse(request("https://apis.naver.com/cafe-web/cafe2/CafeMemberInfo.json?cafeId="+cafeId, {
            cookies: this.cookies
        }))

        if(data.message.status != 200) return null
        return data.message.result
    }

    return getMyInfo

})()


