module.exports = function getPublicIP(req) {
    const headers = req.headers;
    if (headers['x-real-ip']) {
        return headers['x-real-ip'];
    }
    if (headers['x-forwarded-for']) {
        const ipList = headers['x-forwarded-for'].split(',');
        return ipList[0];
    }
    if(req.connection.remoteAddress){
        return req.connection.remoteAddress
    }
    return '0.0.0.0';
}

