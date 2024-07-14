let request = require("../request")

module.exports = (function(){

    /**
     * @param {number|string} cafe - cafeId or clubURL, function recognize it as clubURL if its type is **not a number.**
     * @returns {object|null}
     */
    function getCafeInfo(cafe){
        if(typeof cafe == "number"){
            let data = JSON.stringify(request("https://apis.naver.com/cafe-web/cafe2/CafeGateInfo.json?cafeId="+cafe))
            if(data.message.status != 200) return null
            return data.message.result
        }else{
            let data = JSON.stringify(request("https://apis.naver.com/cafe-web/cafe2/CafeGateInfo.json?cluburl="+cafe))
            if(data.message.status != 200) return null
            return data.message.result
        }
    }

    return getCafeInfo
})()