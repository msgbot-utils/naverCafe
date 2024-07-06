importClass(org.jsoup.Jsoup)
importClass(org.jsoup.Connection)

//수정 바람
module.exports = (function(){

    /**
    * @param {string} query
    * @param {number} max
    * @param {number} sortBy
    * @return {object}
    */

    function main(query, max, sortBy){
        let data = parsing(query, 1, sortBy)
        let count = Math.min(data.message.result.totalCount, max)
        let res = data.message.result.searchResultCafe.searchResult
        
        for(let i = 2; res.length < count; i++){
            data = parsing(query, i, sortBy)
            res.concat(data.message.result.searchResultCafe.searchResult)
        }

        res.length = count

        return {
            res: res,
            count: count
        }
    }

    function parsing(query, page, sortBy){
        return JSON.parse(
            Jsoup.connect("https://apis.naver.com/cafe-home-web/cafe-home/v3/search/cafes")
            .data("query", query)
            .data("sortBy", sortBy)
            .data("page", page)
            .ignoreContentType(true)
            .method(Connection.Method.POST)
            .execute().body()
        )
    }

    return main;

})()