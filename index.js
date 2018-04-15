require('./index.scss')
require('./reset.css')

// 获取窗口的宽度
let htmlWidth = window.innerWidth || document.body.clienWidth;
let htmlDom = document.getElementsByTagName('html')[0];

htmlDom.style.fontSize = htmlWidth / 10 + 'px';


