importClass(org.jsoup.Jsoup);
importClass(org.jsoup.Connection);

module.exports = (function(){

    /**
     * javascript fetch 일부 구현체
     * 
     * @param {string} url - The URL to fetch.
     * @param {object} [config] - Configuration options for the fetch request.
     * @param {string} [config.method="GET"] - The HTTP method to use (e.g., "GET", "POST").
     * @param {string} [config.body] - The request body to send (for POST/PUT requests).
     * @param {object} [config.headers] - The request headers
     * @param {Map<string, string>} [config.cookies] - The request cookies
     * @returns {object} - response value details.
     * @returns {boolean} return.ok - Indicates if the request was successful (status code 200).
     * @returns {number} return.statusCode - The HTTP status code of the response.
     * @returns {object} return.config - The configuration details of the request.
     * @returns {string} return.config.body - The body of the response.
     * @returns {string} return.config.method - The HTTP method used in the request.
     * @returns {string} return.config.url - The URL of the request.
     * @returns {string} return.config.contentType - The content type of the response.
     * @returns {object} return.config.headers - The headers of the response.
     * @returns {function} return.getBased - The Jsoup connection object used to make the request.
     */

    function request(url, config) {
        
        config = config || {};
        let method = Connection.Method[config.method || "GET"];
        let based = Jsoup.connect(url);
        if (config.body) based.requestBody(config.body);
        if (config.headers) if(typeof config.headers == "object" && JSON.stringify(config.headers) !== "{}")
        Object.keys(config.headers).forEach(header => based.header(header, config.headers[header]));
        if(config.cookies && config.cookies.class == java.util.LinkedHashMap)
        based.cookies(config.cookies)
        based.method(method).ignoreContentType(true).ignoreHttpErrors(true);
        let executed = based.execute();
        return {
            ok: executed.statusCode() === 200,
            statusCode: executed.statusCode(),
            config: {
                body: executed.body(),
                method: executed.method(),
                url: executed.url(),
                contentType: executed.contentType(),
                headers: executed.headers(),
            },
            getBased: () => based,
        };
    }

    return request
})()
