var key = require('../captainUtils/constants.js');
var dataSink = require('../captainUtils/dataSink.js');
var getGroupResponse = require('../handlers/getGroupResponseHandler.js')
const keys = new key();
const dataSinkObj = new dataSink();

function GetGroupResponse(response){
  //this.req = request;
  this.res = response;
  this.control = control;
  this.paramBean = new confParamBean(this.control);

}

GetGroupResponse.prototype.respond = function(config){
  this.res.json(config);
  var dataJson = {};
  dataJson["STATUS"] = "success";
  dataJson["data"]= config;
  dataJson["code"]= 200;
  dataJson["uri"]= this.paramBean.getUri();
  dataJson["dep_id"]= this.paramBean.getDeploymentId();
  dataJson["module"]= this.paramBean.getModule();
  dataJson["version"]= this.paramBean.getVersion(); 
  dataJson["software_version"]= keys.VERSION;
  var redis_client = this.control.getRedis();
  dataSinkObj.push2Queue("queueName",  JSON.stringify(dataJson), this.control);
};

module.exports = GetGroupResponse;
