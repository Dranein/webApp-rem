require('./index.scss')
require('./reset.css')
import gameplay from './gameplay.js'
import $ from 'jquery'

// 获取窗口的宽度
let htmlWidth = window.innerWidth || document.body.clienWidth;
let htmlDom = document.getElementsByTagName('html')[0];

htmlDom.style.fontSize = htmlWidth / 10 + 'px';

window.onload = function(){
	var gameTime = 15;
	var rate = 1000; //老鼠出现的频率
	var speed = 3000;//老鼠出现的速度
	$('#startGameBtn').click(()=>{
		/*gameplay arguments:(
			1.老鼠出现的频率,
			2.游戏时间，
			3.时间减少的callback(返回时间)
			4.得分的callback(返回得分)
			5.游戏结束callback(返回得分)
		)*/
		gameplay.gameplay(rate,speed,gameTime,(time)=>{
			$('.ganme-time em').html(gameTime - time)
		},(count)=>{
			console.log('当前分数是：'+count);
		},(count)=>{
			alert('您的最后分数是：'+count);
		})
	})
}