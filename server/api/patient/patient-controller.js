'use strict';

var patientService = require('../../components/patient/patient-service');


exports.register = function(req, res){

    var data = req.body;

    patientService.patient.register({
        'headers':{
            'Content-Type': 'application/json'
        }
    }, data, function(data, error){
        if(error !== null){
            res.status(400).json(error).end();
          }else{
            res.status(200).json(data).end();
        }
    });

};

exports.deletePatient = function(req, res){

    var data = req.body;
    var authHeader = 'ApiKey ' + data.username + ':' + data.authToken;

    patientService.patient.delete({
        'headers':{
            'Accept': 'application/json',
            'Authorization': authHeader
        }
    }, data, function(data, error){
        console.log('Error Patient Delete ', error);
        if(error !== null){
            res.status(400).json(error).end();
          }else{
            res.status(200).json(data).end();
        }
    });

};

exports.updatePatient = function(req, res){

    var data = req.body;
    var authHeader = 'ApiKey ' + data.username + ':' + data.authToken;
    delete data.authToken;
    patientService.patient.update({
        'headers':{
            'Content-Type': 'application/json',
            'Authorization': authHeader
        }
    }, data, function(data, error){

        if(error !== null){
            console.log('Error Patient update ', error);
            res.status(400).json(error).end();
          }else{
            res.status(200).json(data).end();
        }
    });

};


