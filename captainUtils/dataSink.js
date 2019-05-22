
function DataSink(){
  
}

DataSink.prototype.push2Queue = function(queueName, param, control){
  control.getRedis().lpush(queueName, param, function(error, result){
    if(!error){
      control.getLogger().info("Response pushed. -> " + result);
    }
    else{
      control.getLogger().error("Error occured while pushing the response. -> " + error);
    }
  })
}

module.exports = DataSink;
