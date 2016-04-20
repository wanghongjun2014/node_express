var express = require('express');
var router = express.Router();
// var monk = require('monk');
// var monk_conf = require('../conf/monk_conf');
// var data = monk(monk_conf.db_conf);


// var data_base = data.get(monk_conf.db_user_conf,function (err,data) {
// 	if(err) console.log(data);
// });


router.use('/', function(req, res) {
    res.render('users', {
        title: '用户中心',
        res: res
    });
});

module.exports = router;
