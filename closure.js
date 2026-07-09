// const btnSize = document.getElementById("inc-Size");
// const num = document.getElementById("num");

// btnSize.addEventListener("click", () => {
//   increaseSize();
// });

// function countInc() {
//   let count = 1;

//   function incSize() {
//     num.textContent = count++;
//   }
//   return incSize;
// }

// const increaseSize = countInc();

// // Size300();
// // Size200();
// // Size45();

// function multiplierX(x) {
//   return function prodXY(y) {
//     return x * y;
//   };
// }

// const double = multiplierX(5);

// console.log(double(4));
// console.log(double(3));

/// we are doing data encaptulation.......
/*
function initializeBalance(balance) {
  return {
    deposite(amount) {
      balance += amount;
    },
    getBalance() {
      return balance;
    },
  };
}

const account = initializeBalance(5000);
account.deposite(500);
console.log(account.getBalance());

balance = 1000;

console.log(balance);
console.log(account.getBalance());
*/

///

/// loop + var bug (classic Interview trap)..
for (var i = 1; i <= 3; i++) {
  setTimeout(() => {
    console.log(i);
  }, 1000);
}
// we are expecting output --- 1,2,3 but the actual output is come --- 4,4,4.
//.
//.
//.
//.
//.
//.
// Now fixed the problem (Using let)..
for (let i = 1; i <= 3; i++) {
  setTimeout(() => {
    console.log(i);
  }, 1000);
}
// Now output is come what we want...  1 ,2 ,3.... because let creates a new variable at each iteration and thats why each setTimeOut closure has its separate refrence variable... let creates a separate variable at each iteration and closures captures those separate variables instead of sharing one...

//timer();
