/**
 * You have an array of integers, and for each index you want to find the product of every integer except the integer at that index.
 *
 * Write a function get_products_of_all_ints_except_at_index() that takes an array of integers and returns an array of the products.
 *
 */

/**
 * [get_products_of_all_ints_except_at_index description]
 * @param  array ints Array of ints
 * @return array      [description]
 */
function get_products_of_all_ints_except_at_index(ints) {
  var returnInts = [];
  // Case only one int.
  if (ints.length < 1) {
    throw "Not enough integers in array to find product."
  } else if (ints.length === 1){
    // If only one item we will always return an empty array.
    return [];
  }
  // Iterate over each int.
  ints.forEach(function(thisKey){
    // Clone ints so nothing is deleted.
    let myints = ints.slice(0, ints.length);
    // Remove the single item from an array.
    myints.splice(index, 1);
    // Calculate and store int for return.
    returnInts.push(calculateProductsOfAllInts(myints));
  });

  return returnInts;
}

/**
 * Calculate the product of all ints in an array.
 *
 * @param  array ints An array of ints
 * @return int      the product of all the ints
 */
function calculateProductsOfAllInts(ints){
  var returnValue = 1;
  ints.forEach(function(thisInt){
    returnValue = returnValue * thisInt;
  });
  return returnValue;
}

// Sample set.
var intsToParse = [1, 7, 3, 4];

try {
  let results = get_products_of_all_ints_except_at_index(intsToParse);
  console.log(results);
} catch (error) {
  console.log(error);
}
