//添加重写引用，打开 91.cn
// ^http://91.cn url script-analyze-echo-response https://raw.githubusercontent.com/uniqueque/QuantumultX/master/Script/91porn.js

const $ = new init()
!(async () => {
    if ($request.url.indexOf('play') == -1) {
        //列表
        console.log('list')
        await getListPage()
    } else {
        console.log('play')
        //播放
        await getPlayPage()
    }
})()

async function getListPage() {
    const page = $.getUrlParam('page') || 1
    const category = $.getUrlParam('category')
    const m = $.getUrlParam('m')
    const url1 = m ? ("http://91porn.com/v.php?category=" + category + "&viewtype=basic&page=" + page + "&m=" + m) : ("http://91porn.com/v.php?category=" + category + "&viewtype=basic&page=" + page)
    const res = await $.get({
        url: url1, headers: {
            "Accept-Language": "zh-CN",
            "User-Agent": 'Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:53.0) Gecko/20100101 Firefox/53.0',
            "X-Forwarded-For": getRandomIP(),
        }
    })
    const reg = /<a href=".*viewkey=([A-Za-z0-9]+)&.*">/g
    const reg_img = /<img class="img-responsive" src="(.*)" \/>/g
    const reg_title = /<span class="video-title title-truncate m-t-5">(.*)<\/span>/g
    const res1 = res
    const res2 = res
    let html = `<html data-dpr="1" style="font-size: 27.6px;">
<head>
</head>
<body>
  <div><a href="/">主页</a>
    <a href="/?category=hot">当前最热</a>
    <a href="/?category=rp">最近得分</a>
    <a href="/?category=long">10分钟以上</a>
    <a href="/?category=md">本月讨论</a>
    <a href="/?category=tf">本月收藏</a>
    <a href="/?category=mf">收藏最多</a>
    <a href="/?category=rf">最近加精</a>
    <a href="/?category=top">本月最热</a>
    <a href="/?category=tf&m=-1">上月最热</a>
    <a href="/?category=hd">高清</a>
  </div>
<div style="width: 100%;background-size: 100% auto;overflow: hidden;  position: relative;">
`
    while (reg.test(res)) {
        const viewkey = RegExp.$1
        const img = reg_img.exec(res1)[1]
        const title = reg_title.exec(res2)[1]
        html += `<div style="width: 100%;
 padding: 0.6rem 0.48rem;
 border-radius: 0.4rem;
 margin-bottom: 0.4rem;
 overflow: hidden;
 position: relative;">
   <a target="blank" href="/play?viewkey=${viewkey}">
     <img src="${img}" width="360px" height="270px" title="${title}">
   </a>
   <a target="blank" href="/play?viewkey=${viewkey}" title="${title}">
               <span >${title}</span>
             </a>
 </div>`
    }
    html += `</div>
<div style="margin:20px">
<a href="/?category=${category}&m=${m}&page=${page + 1}" title="下一页">
                  <span>下一页</span>
                </a>
</div>
</html>`
    if ($.isQuanX) {
        $.done({ status: 'HTTP/1.1 200', headers: { 'Content-Type': 'text/html;charset=UTF-8' }, body: html })
    } else {
        $.done({ response: { status: 200, headers: { 'Content-Type': 'text/html;charset=UTF-8' }, body: html }})
    }
}
async function getPlayPage() {
    const viewkey = $.getUrlParam('viewkey')
    const url1 = 'http://91porn.com/view_video.php?viewkey=' + viewkey
    const res = await $.get({
        url: url1, headers: {
            "Accept-Language": "zh-CN",
            "User-Agent": 'Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:53.0) Gecko/20100101 Firefox/53.0',
            "X-Forwarded-For": getRandomIP(),
        }
    })
    const reg = /<textarea rows="2" name="video_link" id="fm-video_link".*>(.*)<\/textarea>/g
    if (reg.test(res)) {
        const url2 = RegExp.$1
        const res1 = await $.get({
            url: url2, headers: {
                "Accept-Language": "zh-CN",
                "User-Agent": 'Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:53.0) Gecko/20100101 Firefox/53.0',
                "X-Forwarded-For": getRandomIP(),
            }
        })
        const reg1 = /document\.write\(strencode\(".*"\)\);/g

        const html = `<html>
<head>
</head>
<body>
        <div>
                     <script language="JScript" type="text/jscript" src="http://91porn.com/js/m.js"></script>
                  <div>
        
                     <video controls="" width="80%" autoplay="" name="media">
                     
                                      <script>
                                         ${res1.match(reg1)[0]}

                </script>

                   </video>
            
            </div>
        </div>
</html>`
        if ($.isQuanX) {
            $.done({ status: 'HTTP/1.1 200', headers: { 'Content-Type': 'text/html;charset=UTF-8' }, body: html })
        } else {
            $.done({ response: { status: 200, headers: { 'Content-Type': 'text/html;charset=UTF-8' }, body: html } })
        }
    }
}

function getRandomIP() {
    return getRandNumber(255) + "." + getRandNumber(255) + "." + getRandNumber(255) + "." + getRandNumber(255)

}

// 获取随机数
function getRandNumber(n) {
    return Math.floor(Math.random() * n + 1)
}


function init() {
    const isSurge = typeof $httpClient != "undefined"
    const isQuanX = typeof $task != "undefined"
    //获取URL参数
    const getUrlParam = (name) => {
        console.log(name)
        const arr = $request.url.split('?')
        if (arr.length > 1) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
            var r = arr[1].match(reg);
            if (r != null) return decodeURI(r[2]);
        }
        return ''
    }
    const notify = (title, subtitle, message) => {
        if (isQuanX) $notify(title, subtitle, message)
        if (isSurge) $notification.post(title, subtitle, message)
    }
    const write = (value, key) => {
        if (isQuanX) return $prefs.setValueForKey(value, key)
        if (isSurge) return $persistentStore.write(value, key)
    }
    const read = (key) => {
        if (isQuanX) return $prefs.valueForKey(key)
        if (isSurge) return $persistentStore.read(key)
    }
    const get = (url) => {
        if (isQuanX) {
            return new Promise((resolve, reject) => {
                if (typeof url == "string") url = { url: url };
                url.method = 'GET';
                $task.fetch(url).then(response => resolve(response.body), reason => reject(reason.error))
            })
        } else if (isSurge) {
            return new Promise((resolve, reject) => {
                $httpClient.get(url, (error, response, body) => {
                    if (error) {
                        reject(error)
                    } else {
                        resolve(body)
                    }
                })
            })
        }
    }
    const post = (url) => {
        if (isQuanX) {
            return new Promise((resolve, reject) => {
                if (typeof url == "string") url = { url: url };
                url.method = 'POST';
                $task.fetch(url).then(response => resolve(response.body), reason => reject(reason.error))
            })
        } else if (isSurge) {
            return new Promise((resolve, reject) => {
                $httpClient.post(url, (error, response, body) => {
                    if (error) {
                        reject(error)
                    } else {
                        resolve(body)
                    }
                })
            })
        }
    }
    const done = (value = {}) => {
        $done(value)
    }
    return { notify, write, read, get, post, getUrlParam, done, isQuanX }
}