var express = require('express');
var redis = require('redis');
var logger = require('logger').createLogger();
var router = express.Router();
var ControlBean = require("../captainBeans/controlBean.js");
var conf = require("../resource/config.json");
var key = require("../captainUtils/constants.js");
var getGroupReqHandler = require('../handlers/getGroupRequestHandler.js');
var getConfReqHandler = require('../handlers/getConfRequestHandler.js')
//Object Creation
var control = new ControlBean();
const keys = new key();

//Logger
var logger = require('logger').createLogger('captain.log');
logger.setLevel(conf["log.level"]);

//Redis Connection
var redis_client = redis.createClient();

redis_client.on('connect', function(){
  logger.info('Redis Connected.');
  control.setLogger(logger);
  control.setRedis(redis_client);
});

redis_client.on('error', function(err){
  logger.error('Error in Redis Connection -> ' + err)
})

//GetGroupRequestHandler - http://127.0.0.1:7072/redisgroup?group=group1
router.get('/redisgroup', function(req, res){
  var getRedisGroup = new getGroupReqHandler(control, keys);
  getRedisGroup.getGroupRequestHandler(req, res);
});

//GetConfRequestHandler - http://127.0.0.1:7072/redisconf?redis=vasetup
router.get('/redisconf', function(req, res){
  var getRedisConf = new getConfReqHandler(control, keys);
  getRedisConf.getConfRequestHandler(req, res);
});

//SetConfRequestHandler - http://127.0.0.1:7072/redisconfig
router.post('/redisconfig', function(req, res){
  var hash_name = keys.REDIS_CONF_HASH_PREFIX + (req.body["cdao.redis.name"]);
  var group_name = keys.GROUP_SET_PREFIX + (req.body["cdao.redis.group"]);
  redis_client.hmset(hash_name, req.body, function(err, result1){
    if (!err){
      redis_client.sadd(group_name, req.body["cdao.redis.name"], function(err, result2){
        console.log("res -> " + result2)
        if (!err){
          redis_client.hset("H:sidredismap", req.body["cdao.redis.sid"], req.body["cdao.redis.name"], function(err, result3){
            if(!err){
              res.end("Operation done");
            }else{
              res.end("FAIL")
            }
          })
        }else{
          res.end("FAIL2")
        }
      })
    }else{
      res.end("FAIL3")
    }
  });
  //res.json({"foo":"bar"});
});

module.exports = router;
