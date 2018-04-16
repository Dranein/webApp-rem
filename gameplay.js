import $ from 'jquery'

const gameplay = {
	gameplay:function(time,timeCallBack,callback){
		// 分数
		var count = 0;
		// 地鼠出现的速度1s
		var speed = 1000;
		var $mouseList = $('#gameplay .item-mouse');
		var mouseLen = $mouseList.length;
		startTime(time,()=>{
			// 获取分数
			if(callback) callback(count);
		});
		setInterval(()=>{
			// 随机出现的老鼠，个数由分数决定；
			var targetRandomList = gameClass();
			targetRandomList.map((o)=>{
				var $target = $($mouseList[o]);
				if($target.attr("class") == 'item-mouse'){
					$target.addClass('active');
					// 打到地鼠，清除定时器，并消失，计一分
					$target.click(()=>{
						clearTimeout($target.timeout);
						removeActive($target);
						count++;
					})
					// 与css动画时间一致；设置一个定时器，2s后没有点击便消失
					$target.timeout = setTimeout(()=>{
						removeActive($target);
					}, 2000);
				}
			})
		},speed)
		function gameClass(){
			var targetRandomList = [];
			if(count<3){
				targetRandomList = getRandomList(mouseLen,1);
			}else if(count<7){
				targetRandomList = getRandomList(mouseLen,2);
			}else if(count<12){
				targetRandomList = getRandomList(mouseLen,3);
			}else if(count<20){
				targetRandomList = getRandomList(mouseLen,4);
			}else{
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
			obj.removeClass('active');
			obj.unbind("click")
		};
		// 计时器，传入时间和时间完成后的callback
		function startTime(time,callback){
			var startTime = 0;
			var gameTimeIn = setInterval(()=>{
				startTime++;
				if(timeCallBack) timeCallBack(startTime+1);
				if(startTime>time){
					clearInterval(gameTimeIn);
					if(callback) callback();
				}
			},1000)
		}
	}
}

export default gameplay; 