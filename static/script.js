/* 注入matches规则内的js */
// window.onload = () => {
//     console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx');
//     var body = $(document.getElementById('page-content').contentWindow.document.body)[0];
//     var a = document.createElement('a')
//     a.innerText = '测试'
//     $(body).find('code')[0].parentElement.append(a)
// }
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.greeting == "api") {
        var body = $(document.getElementById('page-content').contentWindow.document.body)[0];
        var res = {};
        $(body).find('strong').each((index, val) => {
            if (val.innerText == '请求方式：') {
                res.method = $(val.parentElement).next().find('li')[0].innerText;
            } else if (val.innerText == '请求URL：') {
                res.url = $(val.parentElement).next().find('code')[0].innerText;
            } else if (val.innerText == '参数：') {
                var parameters = {};
                $(val.parentElement).next().find('tbody tr td:first-child').each((index, val2) => {
                    parameters[val2.innerText] = '';
                });
                res.parameters = parameters;
            }
        })
        sendResponse(res);
    }
});