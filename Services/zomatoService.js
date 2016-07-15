'use strict';

var Models = require('../Models/restaurant');

//Get Users from DB
var getRestaurant = function (criteria, projection, options, callback) {
    Models.find(criteria, projection, options, callback);
};

//Insert User in DB
var createRestaurant = function (objToSave, callback) {
    new Models(objToSave).save(callback)
};

module.exports = {
    createRestaurant: createRestaurant,
    getRestaurant: getRestaurant
};

