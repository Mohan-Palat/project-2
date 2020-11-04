
const mongoose = require('mongoose');

// FUND DAILY PRICE

const dailyPriceSchema = new mongoose.Schema({
  priceDate: {type: Date, default: Date.now},
  price: Number
});

// FUND WITH DAILY PRICE ASSOCIATION - EMBEDDED

const fundSchema = new mongoose.Schema({
  name: String,
  // embed prices in fund
  prices: [dailyPriceSchema],
});

// FUND PRICE GETTER

dailyPriceSchema.path('price').get(function(num) {
  return (num / 100).toFixed(2);
});

// FUND PRICE SETTER

dailyPriceSchema.path('price').set(function(num) {
  return num * 100;
});

module.exports = mongoose.model('Fund', fundSchema);

/* 

----------------------------------------------
Getter and Setter could also be setup thusly..
----------------------------------------------

const dailyPriceSchema = new mongoose.Schema({
  priceDate : {type: Date, default: Date.now},
  price     : {type: Number, get: getPrice, set: setPrice }
});

function getPrice(num){
    return (num/100).toFixed(2);
}

function setPrice(num){
    return num*100;
}

*/



