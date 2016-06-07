(function(win,doc) {
	var scrollComponent = function (option) {
		if(typeof $ !== 'function'){
			return console.log('组件依赖于jQuery，请载入');
		};

		var $$ = this.$$ = window.$;

		var data = {
			wrapper:'body', //默认元素
			dataUrl:'/user/data',
			requestTime:2000,
			startScroll:true,
			animate:{
				status:true,
				time:150
			},
			uid:123    
		};
		this.option = $$.extend({},data,option);
		
		this.init = function () {
			var _this = this;
			this.liveData = [];
			this.startTime = 1000;
			this.startScroll();
		};
		this.init();
	};

	scrollComponent.prototype = {
		startScroll:function () {
			var _this = this;
			var timer;
			//渲染完成容器 设置返回容器为全局容器 开始添加评论项目
			_this.scrollWrapper = this.renderWapper();

			timer = setInterval(function () {

				if(_this.data.length){
					_this.addItem();
				}

			},300);
			
		},
		addItem:function () {
			var _this = this;
			//一次性把全部拿到的数据写入滚动容器
 			while(this.data.length){
 				var newObj = new this.createItem(_this.liveData.shift());

 				newObj.ele.style.opacity = 0;
 				newObj.ele.style.display = 'none';
 				
 				ele = this.scrollWrapper.appendChild(newObj.ele);
 				ele.arginPos = function () {
 					this.style.display = 'block';
 					this.style.marginBottom = this.clientHeight * -1 +'px';
 					this.style.opacity = 1;
 					this.className = 'animate';
 					if(_this.option.animate&&_this.option.animate.status){
 						$(this).animate({marginBottom:'0'},_this.option.animate.time,'linear');
 					}else{
 						this.style.marginBottom = '0px';
 					}
 				};
 				ele.arginPos();
 			}

		},
		renderWapper:function () {
			var _this = this;

			var wrapperEle = document.querySelector(_this.option.wrapper);
			var wrapperWidth = wrapperEle.clientWidth;
			var wrapperHeight = wrapperEle.clientHeight;

			wrapperEle.style.position = 'relative';
			wrapperEle.style.zIndex = '9999';
			var wrapperCss = 'position:absolute;left:0;bottom:0px;width:'+ wrapperEle.clientWidth 
			+'px;margin:0;padding:0;list-style:none;';

			//根据配置数据是在顶部开始显示
			if(!_this.option.startScroll){
				wrapperCss += 'min-height:'+ wrapperHeight+'px;'; 
			}

			var scrollWrapper = document.createElement('ul');

			scrollWrapper.style.cssText = wrapperCss;

			return wrapperEle.appendChild(scrollWrapper);
		},
		createItem:function (text) { //生成元素的构造函数 new 调用
			var _this = this;
			this.ele = document.createElement('li');
			this.postion = function() {
				var positionItme;
				//插入页面后10000毫秒延迟10秒开始每隔2秒自动检测位置 不再可视区域内即删除该元素
				positionItme = setInterval(function () {

					var wrapper = _this.ele.parentElement.parentElement;
					var parent = _this.ele.parentElement;
					var siblingHeight=0;
					var nextSibling = _this.ele.nextSibling;
					_this.num++
					while(nextSibling){
						siblingHeight= siblingHeight + nextSibling.clientHeight;

						nextSibling = nextSibling.nextSibling;
					}
					if(siblingHeight > wrapper.clientHeight){
						console.log('删除元素不在可视区域'+siblingHeight);
						parent.removeChild(_this.ele);
						clearInterval(positionItme);
					};
				},2000);
			};
			//填充生成的item 内容
			this.ele.innerHTML = text;

			//初始延缓调用删除元素
			setTimeout(function() {
				_this.postion();
			},10000);
		},
	};

	win.scrollComponent = scrollComponent;
})(window,document);

var start = document.querySelector('[type=button]');
start.addEventListener('click',function () {
	var scroll = new scrollComponent({
		wrapper:'#sroll_wrapper', //默认元素
		startScroll:true,
		animate:{
			status:false,
			time:150
		},
		dataUrl:'/user/data'
	});
})


<p style="postion:relative;">
	<img src="">
	<a href="" style="postion:absolute;top:0;left:0;width:100%;height:100%;z-index:10;"></a>
</p>

