function ControlBean(){
  this.redis = null;
  this.logger = null;
}

ControlBean.prototype.getRedis = function() {
  return this.redis;
};

ControlBean.prototype.setRedis = function(redis) {
  this.redis = redis;
};

ControlBean.prototype.getLogger = function() {
  return this.logger;
};

ControlBean.prototype.setLogger = function(logger) {
  this.logger = logger;
};

module.exports = ControlBean;