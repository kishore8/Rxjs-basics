import { Observable } from "rxjs";

let myNumbers = [1,3,5];

/** Subsrciber is also an object that implements the observer Interface*/
//we can do something like this


/** The Observer interface here is being used to produce values
 *  by subscriber
 */
let numObservable$ = new Observable(subscriber =>{
    /** subscirber also  uses same methods like observer object
     * error,next,complete
    */
    if(myNumbers.length === 0 ){subscriber.error('no values')};

    for(let num of myNumbers){
        subscriber.next(num);
    }

    subscriber.complete();
});


/** here the observer interface is used to receive the values
 *  two sides of the same coin
 */
let myObserver = {
    next: value => console.log(value),
    error: err => console.log(err),
    complete : () => console.log('done')
};

numObservable$.subscribe(myObserver);
