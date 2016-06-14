var express = require('express');
var monk = require('monk');
var monk_conf = require('../conf/monk_conf');
var data = monk(monk_conf.db_conf);
var router = express.Router();


//挂载于页面的的二级路由
router.get('/', function (req, res) {
	res.render('login', {
		title: '登录中心',
	});
});

router.post('/', function(req, res) {
	// var data_base = data.get(monk_conf.db_user_conf,function (err,data) {
	// 	if(err) console.log(data);
	// });
	// data_base.insert(req.body, function (err, doc) {
	//   if (err) throw err;
	// });
	res.redirect('/');
});

module.exports = router;