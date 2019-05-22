function GetGroupRequest(control, keys){
  this.control = control;
  this.keys = keys;
}

GetGroupRequest.prototype.getGroupRequestHandler = function(req, res) {
  console.log(req.url);
  const { url } = req.url;
  const { group } = req.query;
  var getGroup = this.keys.GROUP_SET_PREFIX + group;
  var redis_client = this.control.getRedis();
  redis_client.smembers(getGroup, function(error, result){
    if(!error){
      res.json(result);
    }
    else{
      logger.error(error);
      res.end('Error');
    }
    console.log('\nCalling getredisgroup -> ');
    console.log(result);
  })
};

module.exports = GetGroupRequest;