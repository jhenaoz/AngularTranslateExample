var http;
var extend = require('node.extend');
var environment = require('../../config/environment');

var OPTIONS = {
  host : environment.api.host,
  port : environment.api.port,
  headers:{
    'API-Key': environment.api.apiKey
  }
};

if (environment.https == true) {
    http = require('https');
    OPTIONS.rejectUnauthorized = false;
}else{
    http = require('http');
}


var request = function (data, options, cb) {
  console.log('OPTIONS ',options);

  var request = http.request(options, function (response) {

    console.log('STATUS CODE', response.statusCode);
    var statusCode = response.statusCode;
    var responsedata = '';
    response.setEncoding('utf8');
    response.on('data', function (data) {
      responsedata += data;
    });

    response.on('end', function () {
      var temp ="";
      try{
        temp = responsedata;
        responsedata = JSON.parse(responsedata);
      }catch(e){
        responsedata = temp;
        console.error(e);
      }
      if (response.statusCode >= 200 && response.statusCode < 300) {
        return cb(responsedata, null);
      }else{
        return cb(null, responsedata);
      }
    });

    response.on('close', function (error) {
      return cb(null, error);
    });
  });

  request.on('error', function (error) {
    return cb(null, error);
  });

  if ( data ) {
    if(typeof(data)==='object'){
      request.setHeader('Content-Length', (JSON.stringify(data)).length);
    }else{
      request.setHeader('Content-Length', data.length);
    }
    request.end(data, 'utf8');
  } else {
    request.end('utf8');
  }
};


exports.patient ={

    register: function(opt, data, cb){
        var options = extend(true, OPTIONS, opt,{
            path:'/api/v1/patients/',
            method: 'POST'
        });
        var dataToSend = JSON.stringify(data);
        request(dataToSend, options, cb);
    },

    delete: function(opt, data, cb){
        var options = extend(true, OPTIONS, opt,{
            path:'/api/v1/patients/' + data.patientCode+'/',
            method: 'DELETE'
        });
        request(null, options, cb);
    },

    update: function(opt, data, cb){
        var options = extend(true, OPTIONS, opt,{
            path:'/api/v1/patients/' + data.id+'/',
            method: 'PATCH'
        });
        delete data.id;
        var dataToSend = JSON.stringify(data);
        request(dataToSend, options, cb);
    }
}
