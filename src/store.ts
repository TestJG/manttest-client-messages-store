import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/of";
import "rxjs/add/observable/merge";
import "rxjs/add/operator/distinctUntilChanged";
import "rxjs/add/operator/filter";
import "rxjs/add/operator/map";
import "rxjs/add/operator/switchMap";
import "rxjs/add/operator/startWith";
import "rxjs/add/operator/observeOn";
import "rxjs/add/operator/subscribeOn";
import "rxjs/add/operator/debounceTime";
import "rxjs/add/operator/timeout";
import * as deepEqual from "deep-equal";
import {
  reassign, reassignif,
  actionCreator, TypedActionDescription, EmptyActionDescription,
  reducerFromActions, Reducer, StateUpdate,
  createStore, Store, StoreMiddleware,
  withEffects, defineStore, ICreateStoreOptions, logUpdates,
  tunnelActions, extendWithActions, extendWith,
} from "rxstore";

/* MODELS */

export interface MessagesModel {
  id: string;
}

export interface MessagesState {
  messages: MessagesModel[];
  canClean: (m: MessagesModel) => boolean;
  compare: (m1: MessagesModel, m2: MessagesModel) => number;
}

/* ACTIONS */

export interface MessagesEvents {
}

const newEvent = actionCreator<MessagesState>("MantTest.Messages/");

export const MessagesActions = {

  addMessages: newEvent.of<MessagesModel[]>(
    "ADD_MESSAGES",
    (s, msgs) => {
        const messages: MessagesModel[] = s.messages
            .map(mOld => msgs.filter(mNew => mNew.id === mOld.id)[0] || mOld)
            .concat(msgs.filter(mNew => !s.messages.some(mOld => mNew.id === mOld.id)))
            .sort(s.compare);
        return reassign(s, { messages });
    }),

  cleanMessages: newEvent(
    "CLEAN_MESSAGES",
    s => reassign(s, {messages: s.messages.filter(m => !s.canClean(m))})),

  removeAll: newEvent("REMOVE_ALL", s => reassign(s, {messages: []})),

  removeById: newEvent.of<string>(
    "REMOVE_BY_ID",
    (s, id) => reassign(s, {messages: s.messages.filter(m => m.id !== id)})),
};

/* STORE */

const MessagesReducer = reducerFromActions(MessagesActions);

export type MessagesStore = Store<MessagesState> & MessagesEvents;

export const defaultMessagesState = (
    canClean?: (m: MessagesModel) => boolean,
    compare?: (m1: MessagesModel, m2: MessagesModel) => number): MessagesState => ({
  messages: [],
  canClean: canClean || (() => true),
  compare: compare || (() => -1),
});

export const createMessagesStore = (
    canClean?: (m: MessagesModel) => boolean,
    compare?: (m1: MessagesModel, m2: MessagesModel) => number) =>
    defineStore<MessagesState, MessagesStore>(
      MessagesReducer,
      defaultMessagesState,
      extendWithActions(MessagesActions)
    );
