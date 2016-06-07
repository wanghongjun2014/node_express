var express = require('express');
var monk = require('monk');
var monk_conf = require('../conf/monk_conf');
var data = monk(monk_conf.db_conf);
var router = express.Router();


//挂载于页面的的二级路由
router.get('/', function(req, res) {
	var data_base = data.get(monk_conf.db_user_conf,function (err,data) {
		if(err) console.log(err);
	});
	res.render('index', {
		title: '首页',
		age:23,
		res: res
	});
});

module.exports = router;