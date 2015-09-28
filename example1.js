/**
 * Suppose we could access yesterday's stock prices as an array, where:
 *
 * The indices are the time in minutes past trade opening time, which was 9:30am local time.
 * The values are the price in dollars of Apple stock at that time.
 * For example, if the stock cost $500 at 10:30am, stock_prices[60] = 500.
 *
 * Write an efficient function that takes stock_prices and returns the best profit I could have made from 1 purchase and 1 sale of 1 Apple stock yesterday.
 *
 * No "shorting"—you must buy before you sell. You may not buy and sell in the same time step (at least 1 minute must pass).
 */
/**
 * List of stock_prices.
 */

// Create prices object.
function StockPrices(stock_prices){
    this.stock_prices = stock_prices;
};

// Create function to get yesterday's best profit.
StockPrices.prototype.getBestProfit = function() {
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

    // this is not always accurate in child functions.
    var that = this;

    // Reverse the object keys get array of obj keys.
    var reversedPriceKeys = Object.keys(this.stock_prices).reverse();

    // Error checking for not enough stock prices.
    if (reversedPriceKeys.length <2){
      throw "Not enough stock prices in sample";
    }

    // Loop through each minute in reverse O(n).
    reversedPriceKeys.forEach(function(stockPriceMinute) {
      // Cast as number.
      stockPriceMinute = Number(stockPriceMinute);

      // Initialize highest price first loop.
      if (loop === 0){
        highestPrice.minute = stockPriceMinute;
        highestPrice.price = that.retrievePriceByMinute(stockPriceMinute);
      }
      // Initialize largest gain on second loop or...
      else if (loop === 1) {
        largestGain.difference = that.calculatePriceGain(highestPrice.price, that.retrievePriceByMinute(stockPriceMinute));
        largestGain.beginMinute = stockPriceMinute;
        largestGain.endMinute = highestPrice.minute;
        // If the loop has propogated the base info do not initialize data.
      } else {
        var priceGain = that.calculatePriceGain(highestPrice.price, that.retrievePriceByMinute(stockPriceMinute));
        if (priceGain > largestGain.difference) {
          largestGain.difference = priceGain;
          largestGain.beginMinute = stockPriceMinute;
          largestGain.endMinute = highestPrice.minute;
        }
      }
      // Determine if new record high is reached.
      if (highestPrice.price < that.retrievePriceByMinute(stockPriceMinute)) {
        highestPrice.minute = stockPriceMinute;
        highestPrice.price = that.retrievePriceByMinute(stockPriceMinute);
      }

      // Iterate loop counter.
      loop++;
    });
    return largestGain;
}

// Retrieve a stock price from a given minute.
StockPrices.prototype.retrievePriceByMinute = function(minute) {
  var minString = String(minute);
  return this.stock_prices[minString];
}

// Calculate price gain.
StockPrices.prototype.calculatePriceGain = function(oldPrice, newPrice) {
    return oldPrice - newPrice;
}

// Sample data.
var stock_prices_yesterday = {
    0: 500,
    1: 501,
    2: 505,
    3: 487,
    4: 501,
    5: 499,
    6: 509,
    7: 500,
    60: 500,
    61: 400
};

var prices = new StockPrices(stock_prices_yesterday);
try {
  console.log(prices.getBestProfit());
} catch (error) {
  console.log(error);
}
