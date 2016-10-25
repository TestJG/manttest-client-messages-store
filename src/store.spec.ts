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
    tunnelActions, ActionTunnel,
} from "rxstore";
import { testActions, expectedActions } from "rxstore-jest";
import {
    testUpdateEffects, testActionEffects, testStateEffects,
    expectAction, expectItem, testLastStateEffects,
} from "rxstore-jest";
import {
    createMessagesStore, defaultMessagesState, MessagesActions, MessagesStore, MessagesModel, MessagesState
} from "./index";

describe("defaultMessagesState", () => {
    describe("Sanity checks", () => {
        it("Should be a function", () => {
            expect(typeof defaultMessagesState).toBe("function");
        });
    });

    describe("Given no options", () => {
        it("The default state should have default values", () => {
            const state = defaultMessagesState();
            expect(typeof state.canClean).toBe("function");
            expect(typeof state.compare).toBe("function");
            expect(state.messages).toEqual([]);
        });
    });

    describe("Given canClean options", () => {
        it("The default state should have expected values", () => {
            const canClean = (m: MessagesModel) => false;
            const state = defaultMessagesState(canClean);
            expect(state.canClean).toBe(canClean);
        });
    });

    describe("Given compare options", () => {
        it("The default state should have expected values", () => {
            const compare = (m1: MessagesModel, m2: MessagesModel) => 1;
            const state = defaultMessagesState(undefined, compare);
            expect(state.compare).toBe(compare);
        });
    });
});

const init = defaultMessagesState();
const initCanClean = defaultMessagesState(m => m.id.length > 1);
const msg1 = reassign(init, { messages: [{ id: "1" }] });
const msg123 = reassign(init, { messages: [{ id: "1" }, { id: "2" }, { id: "3" }] });
const msg123CanClean = reassign(initCanClean, { messages: [{ id: "1" }, { id: "22" }, { id: "33" }] });
const msg1CanClean = reassign(initCanClean, { messages: [{ id: "1" }] });
const msg13 = reassign(init, { messages: [{ id: "1" }, { id: "3" }] });
const msg123v2 = reassign(init, { messages: [{ id: "1" }, { id: "2", value: "" }, { id: "3" }, { id: "4" }] });

testActions(MessagesActions, "MessagesActions",
    expectedActions<MessagesState>("MantTest.Messages/",
        actions => {
            actions.typed("addMessages", "ADD_MESSAGES")
                .withSample(init, [{ id: "1" }], msg1)
                .withSample(msg123, [{ id: "2", value: "" }, { id: "4" }], msg123v2)
                .withSample(msg123, [], msg123)
                .withSample(msg123, msg123.messages, msg123);

            actions.empty("cleanMessages", "CLEAN_MESSAGES")
                .withSample(init, init)
                .withSample(msg123, init)
                .withSample(msg123CanClean, msg1CanClean);

            actions.empty("removeAll", "REMOVE_ALL")
                .withSample(init, init)
                .withSample(msg123, init);

            actions.typed("removeById", "REMOVE_BY_ID")
                .withSample(init, "1",  init)
                .withSample(msg1, "1", init)
                .withSample(msg123, "2", msg13)
                .withSample(msg123, "5", msg123);
}));

describe("createMessagesStore", () => {
  describe("Sanity checks", () => {
    it("should be a function", () => expect(typeof createMessagesStore).toBe("function"));
  });

  testLastStateEffects<MessagesState, MessagesStore>(
      "Given a defaultMessagesStore", createMessagesStore())
      ("When no the store receives no actions", "The state should be as expected", [],
      state => expect(state.messages).toEqual(defaultMessagesState().messages));
});
