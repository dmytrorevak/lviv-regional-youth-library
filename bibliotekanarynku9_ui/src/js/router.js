var routerRegexp = /^([A-z]+)\/?(\d+)?/;

window.onhashchange = function() {
    var hash = getPageHash(),
        hashProcessedData = routerRegexp.exec(hash),
        rootPath = getRootPath(hashProcessedData),
        recourseId = getRecourseId(hashProcessedData);

    switch(rootPath) {
        case 'news':
            newsController(recourseId);
            break;
        case 'announcement':
            announcementController(recourseId);
            break;
        default:
            newsController();
    }
};

function getRecourseId(hashData) {
    return hashData ? hashData[2] : 0;
}

function getRootPath(hashData) {
    return hashData ? hashData[1] : '';
}