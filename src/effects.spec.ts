"use strict";

import "jest";
require("babel-core/register");
require("babel-polyfill");
import { Observable } from "rxjs/Observable";
import { queue } from "rxjs/scheduler/queue";
import "rxjs/add/observable/concat";
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
import "rxjs/add/operator/timeout";
import "rxjs/add/operator/toPromise";

import * as deepEqual from "deep-equal";

import {
    reassign, Store, Action, StoreActions, logUpdates, startEffects,
    tunnelActions, ActionTunnel, withEffects,
} from "rxstore";
import { testActions, expectedActions } from "rxstore-jest";
import {
    testUpdateEffects, testActionEffects, testStateEffects,
    expectAction, expectItem, testLastStateEffects,
} from "rxstore-jest";

import { MessagesState, MessagesStore, createMessagesStore, MessagesActions } from "./store";
import { alertEffects } from "./effects";

describe("Message Store with effects", () => {
  const tester = testActionEffects<MessagesState, MessagesStore>(
    "Given a Messages store with snackbar effects",
    () => createMessagesStore()({middlewaresAfter: [
      withEffects(alertEffects({timeout: 0})),
      logUpdates({ logger: console.log }),
  ]}));

  tester(
    "When the store receives an ADD_MESSAGES",
    "it should produce a removeById event for each message after timeout",
    Observable.of(MessagesActions.addMessages([{id: "1"}, {id: "2"}, {id: "3"}])),
    actions => {
      // expect(actions).toEqual([]);
      // expect(actions[0]).toEqual(MessagesActions.addMessages([{id: "1"}, {id: "2"}, {id: "3"}]));
      // expect(actions[1]).toEqual(MessagesActions.removeById("1"));
      // expect(actions[2]).toEqual(MessagesActions.removeById("2"));
      // expect(actions[3]).toEqual(MessagesActions.removeById("3"));
      expectItem(actions, MessagesActions.addMessages([{id: "1"}, {id: "2"}, {id: "3"}]));
      expectItem(actions, MessagesActions.removeById("1"));
      expectItem(actions, MessagesActions.removeById("2"));
      expectItem(actions, MessagesActions.removeById("3"));
    }, {
      timeout: 1500,
      count: 4,
    },
  );
});
