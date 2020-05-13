
/**Opearators are just functions accepting a set of configs and when returns a function which 
 *  takes a observable and returns a new observable
 */

import { map } from "rxjs/operators";

function myoperator(config1,config2){
    return function (source$){
        return newObservable$;
    }
}

/**MANUAL OPEARTORS */
// let source$ = of(1,2,3,4,5);

// let doubler = map(value => value *2);

// let doubled$ = doubler(source$);

// doubled$.subscribe(value => console.log(value));


/**Creating Operators */

let source$ = of(1,2,3,4,5);
function doublerOpr(){
    return  map(val  =>  val*2)
}

source$.pipe(
    doublerOpr()
).subscribe(
    doublerOpr => console.log(doublerOpr); //2,4,6,8,10
)
