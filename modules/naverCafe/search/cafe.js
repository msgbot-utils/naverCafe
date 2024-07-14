let request = require("../request.js")
let LoginError = require("../error/LoginError")

module.exports = (function(){

    /**
    * @param {string} query
    * @param {number} max
    * @param {number?} sortBy
    * @param {boolean?} login
    * @return {object}
    */

    function main(query, max, sortBy, login){
        if(sortBy == undefined) sortBy = 0 

        let data = parsing(query, 1, sortBy)
        let count = Math.min(data.message.result.totalCount, max)
        let res = data.message.result.searchResultCafe.searchResult
        
        for(let i = 2; res.length < count; i++){
            data = parsing(query, i, sortBy, login)
            res = res.concat(data.message.result.searchResultCafe.searchResult)
        }

        res.length = count

        return {
            res: res,
            count: count
        }
    }

    function parsing(query, page, sortBy, login){
        let config = {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                query: query,
                page: page,
                sortBy: sortBy
            }),
        }

        if(login) {
            if(this.cookies == null) throw new LoginError("login cookies are missing. (= not login)")
            config.cookies = this.cookies
        }

        let data = JSON.parse(request("https://apis.naver.com/cafe-home-web/cafe-home/v3/search/cafes", config))

        data.message.result.searchResultCafe.searchResult.map(e=>{
            e.cafename = e.cafename.replace(/(<b>|<\/b>)/g, "")
            return e
        })
    }

    return main;

})()