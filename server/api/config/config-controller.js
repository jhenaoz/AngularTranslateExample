'use strict';

var configService = require('../../components/config/config-service');

exports.config = function(req, res){
    configService.config.configuration({
        'headers':{
            'Content-Type':'application/json'
        }
     },{},function(data,error){
        if(error !== null){
            res.status(400).json(error).end();
        }else{
            res.status(200).json(data).end();
        }
     });
};
