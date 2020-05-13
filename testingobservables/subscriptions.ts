// /**sample code */
// //testing observables
// // - represent - 1ms and a,b,c are the values produces with 1ms gap
// let source$ = helpers.cold('-a-b-c');
// //  | means it is completed,we can use 12ms time in bettween
// // # is represented as error
// let source$ = helpers.cold('--a-4 12ms c-8|');
// //^ subscription to hot observable began, (cde) means it occurs synchrounsly
// let source$ = helpers.hot('-a-^-b-(cde)---f');


// //testing subscription
// let subscription = ' ^---! ';
// let subscription = ' --^- ';// subscription begins after 2ms and never unsubscribes