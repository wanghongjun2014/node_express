(function ($) {
	$.fn.snow = function (options) {
	var docWidth = $(document).width(),
		docHeight = $(document).height(),
		defaults = {
			minSize : 5 , //最小尺寸
			maxSize : 35,
			onNew : 200,
			html:['&#10052;'],
			flakeColor: ['#fff'] 
		},
		options = $.extend({} ,defaults,options),
		flake = $('<div class="snowbox" />').css(
			{'position': 'absolute',
			'top': '-30px',
			'z-index': '9999'
			}).html(options.html[Math.floor(Math.random()*options.html.length)]),
		interval = setInterval(function () {
				startLeftPosition = Math.random()*docWidth-100,
				startOpacity = Math.random()*0.5,
				sizeFlake = defaults.minSize+Math.random()*defaults.maxSize,
				endTopPosition = docHeight-50,
				endLeftPosition = startLeftPosition-100+Math.random()*200,
				durationColor= options.flakeColor[Math.floor(Math.random()*options.flakeColor.length)];
				durationFall = Math.random()*5000+docHeight*10;
				flake.clone().appendTo('body').css({
					left:startLeftPosition,
					opacity:startOpacity,
					fontSize: sizeFlake,
					color:durationColor
				}).animate({
					top:endTopPosition,
					left:endLeftPosition,
					opacity:0.5
				},durationFall,'linear',function () {
					$(this).remove();
				});
		},defaults.onNew);
	};
})(jQuery);


//页面调用部分
$( function () {
	$(document).click(function () {
		$.fn.snow({});
	})
	
})