const $siteList = $('.siteList')
const x = localStorage.getItem('x')
const xObject = JSON.parse(x)
window.hashMap = xObject ? xObject : [
    { url: "https://www.acfun.cn", shortCut: "acfun" },
    { url: "https://www.bilibili.com/", shortCut: "bili" },
    { url: "https://xiedaimala.com/", shortCut: "xiedaimala" },
    { url: "https://flatuicolors.com/", shortCut: "color" },
    { url: "https://www.iconfont.cn", shortCut: "icon" },
    { url: "https://docs.qq.com/", shortCut: "doc" }
]
const simpleUrl = (url) => {
    return url.replace('https://', '').replace('http://', '').replace(/\/.*/, '')
}
const render = () => {
    $siteList.find('li:not(.last)').remove()
    hashMap.forEach((node, index) => {
        const $li = $(`<li>
            <div class="site" title="快捷键为'${node.shortCut}'">
                <div class="logo">
                    <img src='https://${simpleUrl(node.url)}/favicon.ico' onerror="faviconOnErr(this)"/>
                </div>
                <div class="link">${simpleUrl(node.url)}</div>
                <div class="close">
                <svg class="icon">
                    <use xlink:href="#icon-close"></use>
                </svg></div>
            </div>
    </li>`).insertBefore($('.last'))
        $li.on('click', (e) => {
            window.open(node.url)
        })
        $li.on('click', '.close', (e) => {
            e.stopPropagation();
            hashMap.splice(index, 1)
            render()
        })
    })
}
render()

$('.addButton').on('click', (e) => {
    let url = window.prompt('输入网址')
    if (!(url.trim())) { return }
    let shortCut = window.prompt('输入快捷命令').trim()
    if (url.indexOf('http') !== 0) {
        url = `https://` + url
    }
    hashMap.push({ url: url, shortCut: shortCut })
    render()
    setLocalStorage()
})

window.onbeforeunload = () => {
    setLocalStorage()
}
faviconOnErr = (e) => {
    $(` <svg class="icon"><use xlink:href="#icon-default"></use></svg>`).insertBefore($(e))
    $(e).remove()
}
setLocalStorage = () => {
    localStorage.setItem('x', JSON.stringify(hashMap))
}
let isInputing = true
let currentValue = ``
$(document).on('keydown', (e) => {
    const { key } = e
    const { altKey } = e
    if (altKey && key === 's') {
        $('.searchForm>svg').trigger("click");
    }
})
$(document).on('keypress', (e) => {
    const { key } = e
    if (!isInputing) {
        return
    }
    currentValue += key
    setTimeout(() => {
        currentValue = ``
    }, 1500)

    for (let i = 0; i < hashMap.length; i++) {
        const element = hashMap[i];
        if (element.shortCut === currentValue) {
            window.open(element.url)
        }
    }
})
$('#searchValue').focus(() => {
    isInputing = false
})
$('#searchValue').blur(() => {
    isInputing = true
})
$('.shiftModel').on('click', (e) => {
    let iconType = $('.shiftIcon').attr("xlink:href")
    if (iconType === '#icon-taiyang') {
        $('.shiftIcon').attr("xlink:href", "#icon-yueliang")
        $('body').removeClass('dark');
    } else if (iconType === '#icon-yueliang') {
        $('.shiftIcon').attr("xlink:href", "#icon-taiyang")
        $('body').addClass('dark')
    }
})

$('.searchForm>svg').on('click', () => {
    let icon = $('.searchForm>svg>use')
    let iconType = icon.attr("xlink:href")
    let searchForm = $('.searchForm')
    let searchValue = $('#searchValue')
    if (iconType === '#icon-google') {
        icon.attr("xlink:href", "#icon-baidu")
        searchForm.attr("action", "https://www.baidu.com/s")
        searchValue.attr("name", "wd")
    } else if (iconType === '#icon-baidu') {
        icon.attr("xlink:href", "#icon-google")
        searchForm.attr("action", "https://www.google.com/search?")
        searchValue.attr("name", "q")
    }
})