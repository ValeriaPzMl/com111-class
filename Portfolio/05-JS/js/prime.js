/*
    Prime Factorization - Have the user enter a number and find
    all Prime Factors (if there are any) and display them.
*/

var getPrimeFactors = function (n) {
  "use strict";

  function isPrime(n) {
    var i;

    for (i = 2; i <= Math.sqrt(n); i++) {
      if (n % i === 0) {
        return false;
      }
    }
    return true;
  }

  var i,
    sequence = [];

  //TODO: Check which numbers are factors of n and also check if
  // that number also happens to be a prime
  var c=0;
  for(var h=2;h<=n;h++){
    if(isPrime(h)){
    if(n%h==0){
      sequence[c]=h;
      c++;
    }
  }
  }
  if(isPrime(n))window.alert("is Prime")
  return sequence;
};

// the prime factors for this number are: [ 2, 3, 5, 7, 11, 13 ]
console.log(getPrimeFactors(30030));
