var express = require('express');
var monk = require('monk');
var monk_conf = require('../conf/monk_conf');
var data = monk(monk_conf.db_conf);
var router = express.Router();


//挂载于页面的的二级路由
router.use('/', function(req, res) {
	// var data_base = data.get('users',function (err,data) {
	// 	if(err) console.log(data);
	// });
	console.log(req.body);
	res.render('login', {
		title: '首页',
		age:23,
		res: res
	});
});

module.exports = router;