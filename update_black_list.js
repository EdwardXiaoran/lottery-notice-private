/**复制此代码到控制台(当前页面)即可更新黑名单 */
(function (uids) {
    if (!uids.length) { alert('输入无效'); return }
    $.get('/slice30k/base64-js/raw/master/base64.js').done(basecode => {
        eval(basecode);
        $.get('/api/v5/repos/shanmite/lottery-notice/contents/notice.json').done(notice => {
            (function (content) {
                content.config.blacklist = Array.from(new Set([...content.config.blacklist.split(','), ...uids])).toString();
                content = window.BASE64.encode(JSON.stringify(content));
                $.ajax({
                    url: '/api/v5/repos/shanmite/lottery-notice/contents/notice.json',
                    method: 'PUT',
                    data: {
                        access_token: 'df59f9ec7a8c1695de4b6d3b222a03f0',
                        content,
                        sha: notice.sha,
                        message: uids.toString(),
                    }
                }).done(res => { if (res.commit) { alert('提交成功') } else { alert('提交失败') } })
            })(JSON.parse(window.BASE64.decode(notice.content)))
        })
    })
})(prompt('请输入uid或dyid, 可填入一个或多个, 用英文逗号分割', '').split(',').map(Number).filter(it => it > 0))