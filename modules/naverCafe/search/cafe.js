importClass(org.jsoup.Jsoup)
importClass(org.jsoup.Connection)

module.exports = (function(){

    /**
    * @param {string} query
    * @param {number} max
    * @param {number?} sortBy 
    * @return {object}
    */

    function main(query, max, sortBy){
        if(sortBy == undefined) sortBy = 0 

        let data = parsing(query, 1, sortBy)
        let count = Math.min(data.message.result.totalCount, max)
        let res = data.message.result.searchResultCafe.searchResult
        
        for(let i = 2; res.length < count; i++){
            data = parsing(query, i, sortBy)
            res = res.concat(data.message.result.searchResultCafe.searchResult)
        }

        res.length = count

        return {
            res: res,
            count: count
        }
    }

    function parsing(query, page, sortBy){
        let data = JSON.parse(
            Jsoup.connect("https://apis.naver.com/cafe-home-web/cafe-home/v3/search/cafes")
            .header("content-type", "application/json")
            .requestBody(JSON.stringify({
                query: query,
                page: page,
                sortBy: sortBy
            }))
            .ignoreContentType(true)
            .method(Connection.Method.POST)
            .execute().body()
        )

        data.message.result.searchResultCafe.searchResult.map(e=>{
            e.cafename = e.cafename.replace(/(<b>|<\/b>)/g, "")
            return e
        })
    }

    return main;

})()