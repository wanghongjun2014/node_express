var express = require('express');
var router = express.Router();

//挂载于页面的的二级路由
router.use('/', function(req, res, next) {
  	res.render('help', {
		title: '用户中心',
		res: res
	});
});

module.exports = router;
