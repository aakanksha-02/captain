function ConfParamBean(control){
  const DEFAULT = 'default';
  this.uri = '1/2/3/4/5';
  this.module = null;
  this.version = DEFAULT;
  this.deploymentId = DEFAULT;
  this.valid = false;
  this.logger = control.getLogger();
};

ConfParamBean.prototype.ConfParamBean = function(uri) {
  this.uri = uri;
};

ConfParamBean.prototype.getUri = function() {
  return this.uri;
};
ConfParamBean.prototype.setUri = function(uri) {
  this.uri = uri;
};

ConfParamBean.prototype.getModule = function() {
  return this.module;
};

ConfParamBean.prototype.setModule = function(module) {
  this.module = module;
};

ConfParamBean.prototype.getVersion = function() {
  return this.version;
};

ConfParamBean.prototype.setVersion = function(version) {
  this.version = version;
};

ConfParamBean.prototype.getDeployementId = function() {
  return this.deploymentId;
};

ConfParamBean.prototype.setDeployementId = function(deploymentId) {
  this.deploymentId = deploymentId;
};

ConfParamBean.prototype.isValid = function() {
  return this.valid;
};

ConfParamBean.prototype.loadEnvironment = function(){
  try{
    var sections = uri.split("/");
    if (sections.length == 5) {
      this.module = sections[2];
      this.version = sections[3];
      this.deploymentId = sections[4];
      this.valid = true;
    }
    else {
      this.logger.error("incomplete uri:{}", uri);
    }
  }catch(Exception) {
    this.logger.error("Failed to load environment:{}", uri);
  }
};

module.exports = ConfParamBean;

