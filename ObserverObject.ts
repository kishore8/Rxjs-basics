/** They implement the observer interface,the interface has 3 methods*/


import { of } from "rxjs";

/**OBSERVER OBJECTS */

let myObserver = {
    next: value => console.log(value),
    error: err => console.log(err),
    complete : () => console.log('done')
}
let sourceObservable$ = of(1,3,5);

/** the myobserver is passed as an param to the subscribe method on 
 *  observable
 */
sourceObservable$.subscribe(myObserver);

/** The above thing can be done same below without object as a callback */


/** OBSERVER CALLBACKS*/

let sourceObservable1$ = of(1,3,5);
//if we pass like below a observer  object is created for you,
//each fn is optional
//so we can do just this
sourceObservable1$.subscribe(
    value => console.log(value)
);

sourceObservable1$.subscribe(
     value => console.log(value),
     err => console.log(err),
     () => console.log('done')
);
