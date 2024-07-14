let login = require("../Naver_login");
let LoginError = require("./error/LoginError")
let update = require("./update");

function create /** @constructor */ (config) {
    this.userAgent = config.userAgent || "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36";
    this.id = config.id;
    this.password = config.pw || config.password;
    this.cookies = null;
    /** auto Update */
    this.version = "0.0.1.1-dev";
    this.main = config.main || "sdcard/msgbot/";
    setTimeout(() => {
        let logFile = this.main + "GLOBAL_LOG.json";
        let log = JSON.parse(java.lang.String(java.nio.file.Files.readAllBytes(java.io.File(logFile).toPath()), "UTF-8")).reverse()[1];
        this.scriptName = log.a.split("컴파일 시작: ").slice(1).join("컴파일 시작 : ");
    });
}

create.prototype.login = function(){
    let cookies = login(this.id, this.pw, this.userAgent)

    if(!cookies["NID_AUT"] || !cookies["NID_SES"]){
       throw new LoginError("ID or PW is incorrect, or 2FA is enbled.");
    }

    return this.cookies = cookies;
}

create.prototype.getVersion = function(){
    let basedUrl = "https://raw.githubusercontent.com/msgbot-utils/naverCafe/main/version.json";
    let branch = "dev";

    let data = JSON.parse(org.jsoup.Jsoup.connect(basedUrl).ignoreHttpErrors(true).ignoreContentType(true).execute().body());
    let lastest = data[branch];
    return {
        version: this.version,
        lastest: lastest,
        needUpdate: this.version == lastest
    };
}

create.prototype.update = function(){
    let versionData = this.getVersion();
    if(!versionData.needUpdate) return "already lastest";
    return update(versionData.lastest, this.main, this.scriptName), Api.reload(this.scriptName);
}