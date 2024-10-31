/*
    Sieve of Eratosthenes - The sieve of Eratosthenes is one of the most efficient ways
    to find all of the smaller primes (below 10 million or so).
*/

// TODO: Adjust this script so it can work with the sieve.html file.

var sieve = function (n) {
  "use strict";

  var array = new Array(n + 1).fill(true); // Creamos un array de tamaño n+1 y lo llenamos con true
  var primes = [];
  var i, j;

  // El 0 y el 1 no son primos
  array[0] = array[1] = false;

  // Implementamos el algoritmo de la criba de Eratóstenes
  for (i = 2; i <= Math.sqrt(n); i++) {
    if (array[i]) { // Si el número es primo
      for (j = i * i; j <= n; j += i) {
        array[j] = false; // Marcamos los múltiplos de i como no primos
      }
    }
  }

  // Recogemos todos los números que aún están marcados como true (son primos)
  for (i = 2; i <= n; i++) {
    if (array[i]) {
      primes.push(i);
    }
  }

  return primes;
};
//console.log(sieve(1000000));
document.getElementById('btn').addEventListener('click', function() {
  var num = parseInt(document.getElementById('num').value, 10);
  var primes = sieve(num);
  document.getElementById('primes').textContent = primes.join(', ');
});