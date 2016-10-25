"use strict";

import "jest";
require("babel-core/register");
require("babel-polyfill");
import { Observable } from "rxjs/Observable";
import { queue } from "rxjs/scheduler/queue";
import "rxjs/add/observable/concat";
import "rxjs/add/observable/interval";
import "rxjs/add/observable/empty";
import "rxjs/add/observable/of";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/concat";
import "rxjs/add/operator/delay";
import "rxjs/add/operator/do";
import "rxjs/add/operator/first";
import "rxjs/add/operator/filter";
import "rxjs/add/operator/last";
import "rxjs/add/operator/map";
import "rxjs/add/operator/observeOn";
import "rxjs/add/operator/subscribeOn";
import "rxjs/add/operator/switchMap";
import "rxjs/add/operator/takeLast";
import "rxjs/add/operator/takeUntil";
import "rxjs/add/operator/timeout";
import "rxjs/add/operator/toArray";
import "rxjs/add/operator/toPromise";
import "rxjs/add/operator/withLatestFrom";

import * as deepEqual from "deep-equal";

import {
  reassign, Store, Action, StoreActions, logUpdates, startEffects,
  tunnelActions, ActionTunnel, withEffects, Dispatcher,
} from "rxstore";
import { testActions, expectedActions } from "rxstore-jest";
import {
  testUpdateEffects, testActionEffects, testStateEffects,
  expectAction, expectItem, testLastStateEffects,
} from "rxstore-jest";

import { MessagesState, MessagesStore, createMessagesStore, MessagesActions } from "./store";
import { alertEffects } from "./effects";

describe("Message Store with effects", () => {
  // describe("Given a message store with alert effects", () => {
  //   describe("When an addMessages event is emited", () => {
  //     it("the store should produce the corresponding removeById events after a timeout", () => {
  //       const store = createMessagesStore()({
  //         middlewaresAfter: [
  //           withEffects(alertEffects({ timeout: 50 })),
  //           logUpdates({ logger: console.log }),
  //         ],
  //       }); // createMessagesStore

  //       const prom = store
  //         .action$
  //         .takeUntil(Observable.interval(200))
  //         .takeLast(3)
  //         .toArray()
  //         .toPromise() as PromiseLike<Action[]>;

  //       const addMessages = MessagesActions.addMessages([{ id: "1" }, { id: "2" }, { id: "3" }]);
  //       const seq = Observable.concat(
  //         Observable.of(addMessages).delay(10),
  //       )
  //         ;

  //       const dispatch$ = Observable.of(store.dispatch);
  //       seq
  //         .withLatestFrom(dispatch$, (a, d) => [a, d] as ([Action, Dispatcher]))
  //         .subscribe(([a, d]) => d(a));

  //       return prom
  //         .then(actions => expect(actions).toEqual([
  //           MessagesActions.removeById("1"),
  //           MessagesActions.removeById("2"),
  //           MessagesActions.removeById("3"),
  //         ]));
  //     }); // it
  //   }); //    When an addMessages event is emited
  // }); //    Given a message store with alert effects


  const tester = testActionEffects<MessagesState, MessagesStore>(
    "Given a Messages store with alert effects",
    () => createMessagesStore()({
      middlewaresAfter: [
        withEffects(alertEffects({ timeout: 20 })),
        // logUpdates({ logger: console.log }),
      ],
    }));

  tester(
    "When the store receives an ADD_MESSAGES",
    "it should produce a removeById event for each message after timeout",
    Observable.of(MessagesActions.addMessages([{ id: "1" }, { id: "2" }, { id: "3" }])),
    actions => {
      expect(actions).toEqual([
        MessagesActions.removeById("1"),
        MessagesActions.removeById("2"),
        MessagesActions.removeById("3"),
      ]);
      // expect(actions[0]).toEqual(MessagesActions.addMessages([{id: "1"}, {id: "2"}, {id: "3"}]));
      // expect(actions[1]).toEqual(MessagesActions.removeById("1"));
      // expect(actions[2]).toEqual(MessagesActions.removeById("2"));
      // expect(actions[3]).toEqual(MessagesActions.removeById("3"));
      // expectItem(actions, MessagesActions.addMessages([{ id: "1" }, { id: "2" }, { id: "3" }]));
      // expectItem(actions, MessagesActions.removeById("1"));
      // expectItem(actions, MessagesActions.removeById("2"));
      // expectItem(actions, MessagesActions.removeById("4"));
    }, {
      timeout: 200,
      count: 3,
    },
  );
});
