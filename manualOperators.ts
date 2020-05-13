import { of } from "rxjs";

let source$ = of(1,2,3,4,6);
/** takes a observable and returns a observable */
let doubler  = map(value => value*2);
/**Opeartor is a fn that returns a new fn, the new fn takes a observable as a param and retuens a new observable */
let doubled$ = doubler(source$);
doubled$.subscribe(
        value => console.log(value)  //1,2,3,4,6
);

/**IN Older versions of rxjs  */

source$.map(value => value*2)
            .filter(mappedVal => mappedVal  > 5)
            .subscribe(
                fval => console.log(fval)
            )

/**IN Current version */
source$.pipe(
    .map(value => value*2),
    filter(mappedVal => mappedVal  > 5),
).s