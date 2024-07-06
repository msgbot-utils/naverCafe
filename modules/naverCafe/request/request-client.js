'use-strict';
exports.RequsetClient = /**@class */ (function () {
    const { OkHttpClient, Request, Headers, RequestBody, FormBody, MediaType, MultipartBody } = Packages.okhttp3;
    const { TimeUnit } = java.util.concurrent;
    const { Jsoup } = org.jsoup;

    const qs = require('./qs');

    /**
     * 
     * @param {ClientConfig} config 
     */
    function RequsetClient(config) {
        this.config = config || {};
        this.baseURL = this.config.baseURL;
        this.headers = this.config.headers;
        this.connectTimeout = this.config.connectTimeout || 10;
        this.readTimeout = this.config.readTimeout || 10;
        this.writeTimout = this.config.writeTimout || 10
        this.client = new OkHttpClient.Builder()
            .connectTimeout(this.connectTimeout, TimeUnit.SECONDS)
            .readTimeout(this.readTimeout, TimeUnit.SECONDS)
            .writeTimeout(this.writeTimout, TimeUnit.SECONDS)
            .build()
    }

    /**
     * 
     * @param {ClientConfig} config 
     * @returns 
     */
    RequsetClient.create = function (config) {
        return new RequsetClient(config);
    }

    /**
     * get
     * @param {string} url 
     * @param {RequestConfig} config 
     * @returns 
     */
    RequsetClient.prototype.get = function (url, config) {
        return this.request(Object.assign({
            url: url,
            method: 'GET'
        }, config));
    };

    /**
     * post
     * @param {string} url
     * @param {any} data
     * @param {RequestConfig} config
     */
    RequsetClient.prototype.post = function (url, data, config) {
        return this.request(Object.assign({
            url: url,
            method: 'POST',
            data: data
        }, config));
    };

    RequsetClient.prototype.request = function (config) {
        const request = new Request.Builder();
        const url = (this.baseURL && config.url.startsWith('/')) ? this.baseURL + config.url : config.url;
        if (config.params) {
            const params = qs.stringify(config.params);
            request.url(url + '?' + params);
        } else {
            request.url(url);
        }
        const headers = Object.assign({}, this.headers, config.headers);
        if (headers) {
            const headerBuilder = new Headers.Builder();
            for (let key in headers) {
                headerBuilder.add(key, headers[key]);
            }
            request.headers(headerBuilder.build());
        }
        switch (config.method) {
        case 'GET':
            request.get();
            break;
        case 'POST':
            if (typeof config.data === 'string') {
                request.post(RequestBody.create(MediaType.parse('application/json'), config.data));
            } else if (config.data instanceof MultipartBody) {
                request.post(config.data);
            } else {
                const form = new FormBody.Builder();
                for (let key in config.data) {
                    form.add(key, config.data[key]);
                }
                request.post(form.build());
            }
            break;
        }
        const response = this.client.newCall(request.build()).execute();
        const body = (() => {
            switch (config.responseType) {
            case 'arraybuffer':
                return response.body().bytes();
            case 'blob':
                return response.body().byteStream();
            case 'document':
                return Jsoup.parse(response.body().string());
            case 'json':
                return JSON.parse(response.body().string());
            case 'text':
                return response.body().string();
            default:
                return response.body().string();
            }
        })();

        return {
            data: body,
            status: response.code(),
            statusText: response.message(),
            headers: Object.assign({}, response.headers().toMultimap()),
            config: config,
            request: request.build()
        };
    }

    /**
     * @typedef {object} ClientConfig
     * @property {string} [baseURL]
     * @property {Record<string,string>} [headers]
     * @property {number} [connectTimeout]
     * @property {number} [readTimeout]
     * @property {number} [writeTimout]
     */
    /**
     * @typedef {object} RequestConfig
     * @property {Record<string,any>} [params]
     * @property {any} [data]
     * @property {Record<string,string>} [headers]
     * @property {ResponseType} [responseType]
     */

    /**
     * @typedef {'text' | 'document' | 'blob' | 'json' | 'arraybuffer'} ResponseType
     */

    return RequsetClient;
})();