/**
 * Suppose we could access yesterday's stock prices as an array, where:
 *
 * The indices are the time in minutes past trade opening time, which was 9:30am local time.
 * The values are the price in dollars of Apple stock at that time.
 * For example, if the stock cost $500 at 10:30am, stock_prices_yesterday[60] = 500.
 *
 * Write an efficient function that takes stock_prices_yesterday and returns the best profit I could have made from 1 purchase and 1 sale of 1 Apple stock yesterday.
 *
 * No "shorting"—you must buy before you sell. You may not buy and sell in the same time step (at least 1 minute must pass).
 */
/**
 * List of stock_prices_yesterday.
 */
var s_p_y = {
    0: 500,
    1: 501,
    2: 505,
    3: 487,
    4: 501,
    5: 499,
    6: 509,
    7: 500,
    60: 500
};

// Create prices object.
function Prices(stock_prices_yesterday){
    this.stock_prices_yesterday = stock_prices_yesterday;
};

// Create function to get yesterday's best profit.
Prices.prototype.getYesterdaysBestProfit = function() {
    var sortedPrices = {};
    var largestGain = {
        beginMinute: null,
        endMinute: null,
        difference: null
    };

    var highestPrice = {
        minute: null,
        price: null
    };
    // Loop counter, since index is unrelable.
    var loop = 0;

    var reversedPriceKeys = Object.keys(this.stock_prices_yesterday).reverse();
    reversedPriceKeys.forEach(function(key, index){
        // Initialize highest price first loop.
        if (loop === 0){
            highestPrice.minute = key;
            highestPrice.price = this.stock_prices_yesterday[key];
        }
        // Initialize largest gain on second loop or...
        else if (loop === 1) {
            largestGain.difference = this.calculatePriceGain(this.stock_prices_yesterday[key], highestPrice.price);
            largestGain.beginMinute = this.stock_prices_yesterday[key];
            largestGain.endMinute = highestPrice.minute;
        // If the loop has propogated the base info do not initialize data.
        } else {
            var priceGain = this.calculatePriceGain(this.stock_prices_yesterday[key], highestPrice.price);
            if (priceGain > largestGain.difference) {
                largestGain.difference = priceGain;
                largestGain.beginMinute = this.stock_prices_yesterday[key];
                largestGain.endMinute = highestPrice.minute;
            }
        }
        // Determine if new record high is reached.
        if(highestPrice.price < this.stock_prices_yesterday[key]) {
            highestPrice.minute = key;
            highestPrice.price = this.stock_prices_yesterday[key];
        }

        // Iterate loop counter.
        loop++;
    });
}

// Calculate price gain.
Prices.prototype.calculatePriceGain = function(oldPrice, newPrice) {
    return oldPrice - newPrice;
}

var prices = new Prices(s_p_y);
prices.getYesterdaysBestProfit();
