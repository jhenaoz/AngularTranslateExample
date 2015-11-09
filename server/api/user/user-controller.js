'use strict';

var userService = require('../../components/user/user-service');
var environment = require('../../config/environment');

exports.login = function(req, res){
     var data = req.body.authorization;
     console.log('REQ', req.body);
     userService.user.login({
        'headers':{
            'Accept':'application/json',
            'Authorization':'Basic ' + req.body.authorization,
            'API-Key': environment.api.apiKey
        }
     },{},function(data,error){
        if(error !== null){
            res.status(400).json(error).end();
        }else{
            res.status(200).json(data).end();
        }
     });
};


exports.forgot = function(req, res){

    userService.user.forgot({},req.body,function(data,error){
        if(error !== null){
            res.status(400).json(error).end();
        }else{
            res.status(200).json(data).end();
        }
    });
};


exports.invitation = function(req, res){
    var data = {
      code: req.params.code
    };
    userService.user.invitation({
        'headers':{
            'API-Key': environment.api.apiKey
        }
    },data,function(data,error){
        if(error !== null){
            res.status(400).json(error).end();
        }else{
            res.status(200).json(data).end();
        }
    });
};

exports.acceptInvitation = function(req, res){

    var data = req.body;
    data.code = req.params.code;


    userService.user.acceptInvitation({
        'headers':{
            'API-Key': environment.api.apiKey,
            'Content-Type':'application/json'
        }
    },data,function(data,error){
        if(error !== null){
            res.status(400).json(error).end();
        }else{
            res.status(200).json(data).end();
        }
    });
};

exports.resetPassword = function(req, res){

    var data = req.body;
    data.code = req.params.code;


    userService.user.resetPassword({
        'headers':{
            'API-Key': environment.api.apiKey,
            'Content-Type':'application/json'
        }
    },data,function(data,error){
        if(error !== null){
            res.status(400).json(error).end();
        }else{
            res.status(200).json(data).end();
        }
    });
};
