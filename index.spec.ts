import {TestScheduler} from 'rxjs/testing';
import {expect } from 'chai';
import {delay,take} from 'rxjs/operators';

describe('Rx-BookTest',()=>{
    let scheduler;

    beforeEach(()=>{
      scheduler =  new TestScheduler((actual,expected)=>{
            expect(actual).deep.equal(expected);
        })
    })

    it('produces a single value and completion and message',()=>{
        scheduler.run(helpers =>{
            const source$ = helpers.cold('a|');
            const expected = 'a|';

            helpers.expectObservable(source$).toBe(expected);
        })
    })


})