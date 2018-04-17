import $ from 'jquery'

const gameplay = {
	gameplay:function(rate,speed,time,timeCallBack,scorecallback,endCallback){
		// 分数
		var count = 0;
		var speed = speed;
		var $mouseList = $('#gameplay .item-mouse');
		var mouseLen = $mouseList.length;
		// 开始游戏
		startTime(time,()=>{
			// 游戏结束，获取分数
			if(endCallback) endCallback(count);
		});
		// 老鼠定时出现
		setInterval(()=>{
			// 随机出现的老鼠，个数由分数决定；
			var targetRandomList = gameClass();
			targetRandomList.map((o)=>{
				var $target = $($mouseList[o]);
				if($target.attr("class") == 'item-mouse'){
					$target.css({'animation-duration':speed/1000+'s'})
					var randomActive = parseInt(Math.random()*3);
					console.log(randomActive)
					$target.addClass('active'+randomActive);
					// 打到地鼠，清除定时器，并消失，计一分
					$target.click(()=>{
						clearTimeout($target.timeout);
						if($target.hasClass('active0')){
							count++;
							if(scorecallback) scorecallback(count);
						}
						removeActive($target);
					})
					// 与css动画时间一致；设置一个定时器
					$target.timeout = setTimeout(()=>{
						removeActive($target);
					}, speed);
				}
			})
		},rate)
		// 游戏难度
		function gameClass(){
			var targetRandomList = [];
			if(count<3){
				speed = 3000;
				targetRandomList = getRandomList(mouseLen,1);
			}else if(count<7){
				speed = 2800;
				targetRandomList = getRandomList(mouseLen,2);
			}else if(count<12){
				speed = 2500;
				targetRandomList = getRandomList(mouseLen,3);
			}else if(count<20){
				speed = 2300;
				targetRandomList = getRandomList(mouseLen,4);
			}else{
				speed = 2000;
				targetRandomList = getRandomList(mouseLen,5);
			}
			return targetRandomList;
		};
		// 获取随机的数组，不重复，mouseLen为老鼠的个数，num为随机数组的个数
		function getRandomList(mouseLen,num){
			var mouseIndexList = [];
			var resultList = [];
			for(var i = 0;i<mouseLen;i++){
				mouseIndexList.push(i);
			}
			for(var i = 0;i<num;i++){
				resultList.push(mouseIndexList.splice(parseInt(Math.random()*mouseLen),1));
			}
			return resultList;
		};
		// 去处地鼠active并移除click事件
		function removeActive(obj){
			obj.attr({'class':'item-mouse'});
			obj.unbind("click")
		};
		// 计时器，传入时间和时间完成后的callback
		function startTime(time,callback){
			var startTime = 0;
			var gameTimeIn = setInterval(()=>{
				++startTime;
				if(timeCallBack) timeCallBack(startTime);
				if(startTime>time){
					clearInterval(gameTimeIn);
					if(callback) callback();
				}
			},1000)
		}
	}
}

export default gameplay; 