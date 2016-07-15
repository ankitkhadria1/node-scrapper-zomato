var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var zomato = new Schema({
    restaurant_url: {type: String},
    name: {
        type: String,
        required: true
    },
    res_id :{type:Number},
    location:{type:Object},
    cuisines:{type:String},
    average_cost_for_two:{type:String},
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: Date,
    menu_image:{type:String}

});

module.exports = mongoose.model('restaurants', zomato);
