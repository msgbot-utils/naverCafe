importClass(java.net.URL);

module.exports = function(version, msgbotPath, script){
    let zipFilePath = "https://raw.githubusercontent.com/msgbot-utils/naverCafe/main/update/" + version + ".zip";
    
    try{
        let url = new URL(zipFilePath)
        let connection = url.openConnection()
    
        let input = connection.getInputStream()
        let output = new java.io.FileOutputStream(msgbotPath);

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
            return false;
        }
    }


};

// ㄱㄷ  나 노트북 켜두고 간다  pc 방에서 접속함!  친구 만나러

/**
     public static byte[] getBytesFromUrl(String fileUrl) throws IOException {
        URL url = new URL(fileUrl);
        HttpURLConnection connection = (HttpURLConnection) url.openConnection();
        connection.setRequestMethod("GET");
        
        try (InputStream in = connection.getInputStream();
             ByteArrayOutputStream baos = new ByteArrayOutputStream()) {
            byte[] buffer = new byte[1024];
            int bytesRead;
            while ((bytesRead = in.read(buffer)) != -1) {
                baos.write(buffer, 0, bytesRead);
            }
            return baos.toByteArray();
        }
    }
 */