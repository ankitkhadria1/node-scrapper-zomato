/**
 * Created by cbl97 on 15/7/16.
 */
var request = require('request');
var cheerio = require('cheerio');
var URL = require('url-parse');
var json2csv = require('json2csv');
var fs = require('fs');
var connection = require('./connection')
var sendResponse = require('./errorResponse.js');
var zomato = require('../Services/zomatoService');
var ACCESS_TOKEN = "6731d0a864dfd26d45b899b225ee9302";
var API_END_POINT = 'https://developers.zomato.com/api/v2.1';

function  callApi(resource, qs, callback) {
    var options = {
        method: 'GET',
        url: API_END_POINT + resource,
        headers: {
            'user-key': ACCESS_TOKEN,
            'content-type': 'application/json'

        },
        qs:qs
    };

    request(options, function(error, response, body) {
        callback(error, response);
    });
};
/*
* ==========
*  get list of zomato restaurant's...........
* */
exports.getRestaurant = function(request,reply) {

    var data= {
        'entity_id':1,
        'entity_type':'city'
    }
    callApi('/search', data, function (err, response) {
        if (err) {
           var msg = err.toString();
            return sendResponse.sendErrorMessage(msg,reply,400);
        }
        else {
            var result = JSON.parse(response.body);
            var r =result.restaurants;
            var len =r.length;
            console.log(len);
            for(var i=0;i<len;i++)
            {
                (function(i)
                {

                    var res =r[i].restaurant;
                    var obj = {
                        restaurant_url: res.url,
                        name: res.name,
                        res_id :res.id,
                        location:res.location,
                        cuisines:res.cuisines,
                        average_cost_for_two:res.average_cost_for_two,
                        updated_at: new Date(),
                        menu_image: res.menu_url
                    };
                    // console.log(obj);
                    zomato.createRestaurant(obj, function(err, result) {
                        if (err) {
                            var msg = err.toString();
                            return sendResponse.sendErrorMessage(msg,reply,400);
                        } else {
                            // console.log("category saved");
                            if(i==len-1)
                            {
                                console.log("category saved");
                                return sendResponse.sendSuccessData({},"successful",reply,200);

                            }

                        }

                    })

                })(i);
            }
        }

    })
}


/*
*=============================
* get restaurant data from mongoDb
* -====================
*
* */

exports.getRestaurantDetails = function (request,reply)
{
    var criteria = {

    };
    zomato.getRestaurant(criteria, {}, {}, function(err, result) {
        if (err)
        {   console.log(err);
            var msg ="Error in db";
            return sendResponse.sendErrorMessage(msg,reply,400);
        }
        else {

            var fields = ['restaurant_url', 'name', 'res_id','location','cuisines','average_cost_for_two','menu_image'];
            var csv = json2csv({ data: result, fields: fields });

            fs.writeFile('file.csv', csv, function(err) {
                if (err) throw err;
                else
                {
                    return sendResponse.sendSuccessData(result,"Successful",reply,200);
                }
            });


        }

    })

}