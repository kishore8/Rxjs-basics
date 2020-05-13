import { Observable, Subscriber, of, from, concat, 
    fromEvent, interval, throwError, Subject,asapScheduler,AsyncSubject,queueScheduler,merge, asyncScheduler } from 'rxjs';
 import { allBooks, allReaders }  from './data';
 import { ajax } from 'rxjs/ajax';
 import { mergeMap, filter, tap, catchError,
    take,takeUntil, flatMap, multicast, refCount, publish, share, publishLast,publishBehavior, publishReplay, observeOn

} from 'rxjs/operators';

//#region creating Observables
 // function subscribe(subscriber){
//     for(let books of allBooks){
//         subscriber.next(books);
//     } 
// }


//subscriber implements the  Observer interface{which has next,error,complete methods} and extends the \
//subscription class , observers get converted to subscribers

//Observable.create - another way to create a observable
// let getAllBooksObs$ =  new Observable(subscriber =>{
//     if(document.title != 'sdadas'){
//         subscriber.error('Incorrect');
//     }
//     for(let books of allBooks){
//         subscriber.next(books);
//     } 

//     setTimeout(() => {
//             subscriber.complete();
//     }, 100);

//     return () => console.log('done');
// });

// getAllBooksObs$.subscribe(book => console.log(book));



let source1$ = of('hello',10,true,allBooks[0]);

//source1$.subscribe(value => console.log(value));


/** create new observavble from differetnt type of data you already have */
let source2$ = from(allBooks);

//source2$.subscribe(value => console.log(value));

/**combine 2 observables into one using concat and give it to observer*/

concat(source1$,source2$) //returns a single observable with all values from 1st observable followed by 2nd obs

///concat(source1$,source2$).subscribe(value => console.log(value));



//Observable for dom events
//let button = document.getElementById('readersButton');


// fromEvent(button,'click').subscribe(event =>{
//     console.log(event);
//     let readersDiv =  document.getElementById('readers');
//     for(let reader of allReaders){
//         readersDiv.innerHTML+= reader.name + '<br>';
//     }
// });

// let button = document.getElementById('readersButton');


//  fromEvent(button,'click').subscribe(event =>{
//     ajax('/api/readers').subscribe(ajaxResp =>{
//        let readers = ajaxResp.response;
//        let readersDiv =  document.getElementById('readers');
//              for(let reader of readers){
//                 readersDiv.innerHTML+= reader.name + '<br>';
//             }
//     })
//  });

//#endregion

//#region  subscribing to observables with observers

/** Observer object */
    let books$ = from(allBooks);
    let booksObserver = {
        next: value => console.log(value),
        error: err => console.log(err),
        complete:() => console.log('done')
    }

  //  books$.subscribe(booksObserver);

/** Observer Callback */
let books2$ = from(allBooks);
/**behind the scenes rxjs converts this 3 fns into a observer object
 * all of the functions are optional
*/

// books2$.subscribe(
//     value => console.log(value),
//     err => console.log(err),
//     () => console.log('done')
// );


/**Multiple observers for a single observable */
let currentTime$ = new Observable(subscriber =>{
    const timeString = new Date().toTimeString();
    subscriber.next(timeString);
    subscriber.complete();
});


/**All observers have different time value being produced */
// currentTime$.subscribe(
//     currentTime => console.log(currentTime)
// );

// setTimeout(() => {
//     currentTime$.subscribe(
//         currentTime => console.log('after some time:' + currentTime)
//     )    
// }, 1000);


// setTimeout(() => {
//     currentTime$.subscribe(
//         currentTime => console.log('after some time 3:' + currentTime)
//     )    
// }, 2000);


/**subscribe method actually returns a subscription object , for cancelling the execution of observable from observer
 *  we can cancel observable normally when error occurs or complete is called, but if we want
 * to cancel it from observer , then we need to call unsubscribe()
*/

// let timesDiv = document.getElementById('times');
// let unsubbutton = document.getElementById('timerButton');

// //let timer$ = interval(1000);
// //create our own interval observable

// let timer$ = new Observable(subscriber =>{
//     let i=0;
//     let intervalID = setInterval(()=>{
//         subscriber.next(i++);
//     },1000);

//     return()=>{
//         console.log('teardown code');
//         clearInterval(intervalID);
//     }
// })

// let timerSubscription  = timer$.subscribe(
//     value => timesDiv.innerHTML += `${new Date().toLocaleTimeString()}(${value}) <br>`,
//     null,
//     () => console.log('all done')
// )


// let timer2Subsrciption = timer$.subscribe(
//     value => console.log('2ndobserver' + value)
// );
// /**Cancelling multiple subscriptions at a time use add method*/

// timerSubscription.add(timer2Subsrciption);


//fromEvent(unsubbutton,'click').subscribe(event => timerSubscription.unsubscribe());


//#endregion

//#region Operators

/**Pipe was introduced for treeshaking purpose */
        //   ajax('/api/errors/500')
        //     .pipe(
        //         mergeMap(ajaxResp => ajaxResp.response),
        //         filter( ajaxResp => ajaxResp['response'].book['publicationYear'] <  1950),
        //         tap(oldBook => console.log(oldBook)),
        //        // catchError(err => of({title:'coroddo',author:'kishore'}))
        //        /**Can do retry also from here */
        //       //catchError(err  =>  throw  `something bad hapd - ${err.meesage}`)
        //       catchError((err) =>  {return throwError(err.message)}) //great operators to deal with errors
        //     ).subscribe(
        //         finalvalue => console.log(finalvalue),
        //         err => console.log(err)
        //     )

/**Controlling the number of values  produced by a observable*/

let timesDiv = document.getElementById('times');
let unsubbutton = document.getElementById('timerButton');

//let timer$ = interval(1000);
//create our own interval observable

    // let timer$ = new Observable(subscriber =>{
    //     let i=0;
    //     let intervalID = setInterval(()=>{
    //         subscriber.next(i++);
    //     },1000);

    //     return()=>{
    //         console.log('teardown code');
    //         clearInterval(intervalID);
    //     }
    // })

    /**Take operator specifies how may values you want to receive from the observable,
     * Take also unsubscribes automatically
     */
    
    // timer$.pipe(
    //     take(3)
    // ).subscribe(
    //     value => timesDiv.innerHTML += `${new Date().toLocaleTimeString()}(${value}) <br>`,
    //     null,
    //     () => console.log('all done')
    // )


    /**Takeuntil */
    //let cancelTimer$ = fromEvent(unsubbutton,'click');
    /**Takeuntil works like observable produces values  until the canceltimer observable produces its 
     *  first value until then it keeps on timer observable keeps on producing value
     * ITs awesome
     * Take also unsubscribes automatically
    */
    // timer$.pipe(
    //     takeUntil(cancelTimer$)
    // ).subscribe(
    //     value => timesDiv.innerHTML += `${new Date().toLocaleTimeString()}(${value}) <br>`,
    //     null,
    //     () => console.log('all done')
    // )

//#endregion


/**CREATING CUSTOM OPERATORS */

/**
 * if we want to create a dominic specific operators, or if we want to create a wrapper around exisitng opearators
 * or if we are always reusing a set of opeartors we can combine and make them a custom opertor.
 */


//#region Custom operators

      
// function grabAndLogClassics(year,log){
//     return source$ =>{
//         return new Observable(subscriber =>{
//            return source$.subscribe(
//                 book => {
//                     if(book['publicationYear'] < year){
//                         subscriber.next(book);
//                         if(log){
//                             console.log('log classics'+book.title);
//                         }
//                     }
//                 },
//                 err => subscriber.error(err),
//                 () => subscriber.complete()
//             )
//         });
//     }
// }
// /**Simplest custom opeartor */
//     function grabClassics(year){
//         return filter(book => book['publicationYear'] < year);
//     }

//     function grabAndLogClassicsWithPipe(year,log){
//         return source$ => source$.pipe(
//             filter(book => book['publicationYear'] < year),
//             tap(classicBook => log ? console.log('tap'+ classicBook) : console.log('tap'+ null))
//         )
//     }

//         ajax('/api/books')
//             .pipe(
//                 flatMap(AjaxResponse => AjaxResponse.response),
//             //   grabAndLogClassics(1930,false)
//            // grabClassics(1950)
//            grabAndLogClassicsWithPipe(1930,false)
//             ).subscribe(
//                 val => console.log(val)
//             )


            
//#endregion


//#region Subjects and MultiCasted Observables 

/**Subjects and MultiCasted Observables */
/**Subjects are both observers and observables they have array of observers list to emit the values 
 * It extends the observable class,hover and check the methods with vs code intellisense
*/


// let subject$ = new Subject();
// subject$.subscribe(
//     value => console.log('ob1: ' + value)
// )
// subject$.subscribe(
//     value => console.log('ob2: ' + value)
// )

// subject$.next('Hola');

// /**Subjects sit between the source observable and observers */
// let source$ = new Observable(subscriber =>{
//     subscriber.next('Greetings');
// });

// source$.subscribe(subject$);


// let source$ = interval(1000).pipe(
//     take(4)
// );
/**COld observable as the producer is inside the observable,they are unicast */

/**Unicast means everytime i call a subscribe it kicks of new instance of observable 
 *  to change to HOT Observable use subjects
 * we create a subject and pass it to subsrcibe of the observable and we subscribe to the subject instead of
 * observable, subject multicasts the value
*/

// let subject$ = new Subject();

// source$.subscribe(subject$);
// subject$.subscribe( 
//     value => console.log('ob1: ' + value)
// )
// setTimeout(() => {
//     subject$.subscribe(
//         value => console.log('ob2: ' + value)
//     )
// }, 1000);

// setTimeout(() => {
//     subject$.subscribe(
//         value => console.log('ob3: ' + value)
//     )
// }, 2000);


/**There are some inbuilt operators to multicast cold observables to hot in rxjs 
 * multicast() operator it returns a spl type of observable called connectable observable
 * to trigger a connectable observable we have a call a method name connect.
 * 
 * refcount() op can be used with other multicasting oprs to automatically trigger the
 * source of execution of observables when the no of observers > 0
 * 
 * publish() wrapper around mutlicast,diff is it not requierd to pass the subject.
 * 
 * share() executes when observers > 0
 *      -subscribe/ resubscribe automatically based on the observer count
*/

// let source$ = interval(1000).pipe(
//     take(4),
//   //  multicast(new Subject()), //returns a connectable observable
// //   publish(),  
// //   refCount() // observable begins executing after 1st observer subscribed
//     share()
//     );

// source$.subscribe( 
//     value => console.log('ob1: ' + value)
// )
// setTimeout(() => {
//     source$.subscribe(
//         value => console.log('ob2: ' + value)
//     )
// }, 1000);

// setTimeout(() => {
//     source$.subscribe(
//         value => console.log('ob3: ' + value)
//     )
// }, 2000);


// /**By the time this is subscribed the observable has stopped emitting  so only the complete fn is called
//  * it is a late subscriber, publish doesnt wait for late subscribers,
//  * but there is operator to handle this scenario - Share operator
//  * late subscribers are triggered with share , a new execution of observable  is triggered and 4th observer get alls 
//  * the values as well as complete fn
// */
// setTimeout(() => {
//     source$.subscribe(
//         value => console.log('ob4: ' + value),
//         null,
//         () => console.log("ob4: " + 'complete')
//     )
// }, 4500);
//source$.connect(); //when using multicast opeartor


/**SPECIAZLIED SUBJECTS */
/**
 * AsyncSubject - operator used to do this is publishLast()
 * -only emits the last value received by the source observable
 * 
BehaviourSubject - operator used to do this is publishBehaviour(),
- emits a intital seed value if the producer has not yet produced a value
- if observer is added are observable starts producing then stores and
 emits the most recent value instead of seed value
 no values for late subscribeers

replaySubject - stores and emits multiple values to all observers,
the stored values are replayed emitted to all observers
operator used - publishReplay()
values for late subscribeers too here ...super
 * 
 * 
*/

// let source$ = interval(1000).pipe(
//         take(4),
//        // publishLast(), //waited for all values to be pulished and sent only last value to all observers
//        //publishBehavior(42) ,
//        publishReplay(),
//        refCount()
//     );


//      source$.subscribe( 
//             value => console.log('ob1: ' + value)
//         )
//         setTimeout(() => {
//             source$.subscribe(
//                 value => console.log('ob2: ' + value)
//             )
//         }, 1000);
        
//         setTimeout(() => {
//             source$.subscribe(
//                 value => console.log('ob3: ' + value)
//             )
//         }, 2000);
//     setTimeout(() => {
//         source$.subscribe(
//             value => console.log('ob4: ' + value),
//             null,
//             () => console.log("ob4: " + 'complete')
//         )
//     }, 4500);



//#endregion


//#region controlling executions with scheduler
    /**
     * Schedulers - control when an observable begins exectuing and when notifications are
     * delivered to its observers . all observable creation function take a optional param schdeuler
     * and a default value
     * 
     * RXJS SCHEDULERS
     * queueScheduler
     * asyncScheduler
     * asapScheduler
     * animattionFrameScheduler
     * TestScehduler
     * 
     * 
     * Understanding schedulers and the event loop
     *  
     */

    // console.log('start script');
    //     let queue$ = of('Queuescheduler', queueScheduler); //sync
    //     let asap$ = of('asapSchedulrt',asapScheduler); //async  - asap before async added to microtask queue
    //     let async$ = of('asyncSchedulrt',asyncScheduler); //async 
    //    //asap priority more than async
    //     merge(queue$,asap$,async$).subscribe(
    //         value => console.log(value)
    //     );

    // console.log('end script');





    // console.log('start script');

    // from([1,2,3,4],queueScheduler).pipe(
    //     tap(value => console.log(value)), //synchrnous
    //     observeOn(asyncScheduler), //can make the next tap it async to if it is an expensive task to avoid blocking the event loops
    //     tap(value => console.log(value*2)), //it became asynchrnous because of  the observeon Operator
    // ).subscribe(); 
    
    // //O/p: start script
    // //1,2,3,4
    // //end script
    // //2,4,6,8

    // console.log('end script');


    //observeOn opeartor to apply scheduler 
//#endregion

//BASICS OF RXJS DONE

/**TEST SCHEDULER 
 * 
 * only  works with asyncscheduler
 * 
 * 
*/
