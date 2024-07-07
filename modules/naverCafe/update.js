importClass(java.net.URL);

module.exports = function(version, msgbotPath, script){
    let zipFilePath = "https://raw.githubusercontent.com/msgbot-utils/naverCafe/main/update/" + version + ".zip";
    
    let modulePath = (function () {
        if(!java.io.File(msgbotPath + "global_modules/naverCafe").exists()) {
            return msgbotPath + "Bots/" + script + "/modules/naverCafe";
        }else return msgbotPath + "global_modules/naverCafe";
    })

    try{
        let url = new URL(zipFilePath)
        let connection = url.openConnection()
    
        let input = connection.getInputStream()
        let output = new java.io.FileOutputStream(modulePath);

        let buffer = java.lang.reflect.Array.newInstance(java.lang.Byte.TYPE, 4096)
        let bytesRead

        while ((bytesRead = input.read(buffer)) != -1) {
            output.write(buffer, 0, bytesRead);
        }

        input.close()
        output.close()
    }catch (err){
        if(err instanceof java.io.IOException) {
            Log.error(err + "\n" + err.stack.slice(0, -1));
            throw err;
        }else throw err;
    }
};