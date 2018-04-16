require('./index.scss')
require('./reset.css')
import gameplay from './gameplay.js'
import $ from 'jquery'

// 获取窗口的宽度
let htmlWidth = window.innerWidth || document.body.clienWidth;
let htmlDom = document.getElementsByTagName('html')[0];

htmlDom.style.fontSize = htmlWidth / 10 + 'px';

window.onload = function(){
	var $timeShow = $('.ganme-time em'); 
	var gameTime = 60;
	$('#startGameBtn').click(()=>{
		gameplay.gameplay(gameTime,(time)=>{
			$timeShow.html(gameTime - time)
		},(count)=>{
			alert('您的最后分数是：'+count)
		})
	})
}