function getConfRequest(control, keys){
  this.control = control;
  this.keys = keys;
}

getConfRequest.prototype.getConfRequestHandler = function(req, res) {
  const { redis } = req.query;
  var getRedis = this.keys.REDIS_CONF_HASH_PREFIX + redis;
  var redis_client = this.control.getRedis();
  redis_client.hgetall(getRedis,function(error, result){
    if(!error){
      res.json(result);
    }
    else{
      logger.error(error);
      res.end('Error');
    }
    console.log('\nCalling GetConfRequestHandler -> ');
    console.dir(result);
  });
};

module.exports = getConfRequest;