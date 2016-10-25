import { Observable } from "rxjs/Observable";
import { queue } from "rxjs/scheduler/queue";
import "rxjs/add/observable/of";
import "rxjs/add/observable/interval";
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
import "rxjs/add/operator/delay";
import "rxjs/add/operator/takeUntil";
import "rxjs/add/operator/do";
import * as deepEqual from "deep-equal";
import {
  reassign, reassignif,
  actionCreator, TypedActionDescription, EmptyActionDescription,
  reducerFromActions, Reducer, StateUpdate,
  createStore, Store, StoreMiddleware,
  withEffects, defineStore, ICreateStoreOptions, logUpdates,
  tunnelActions, extendWithActions, extendWith, Action,
} from "rxstore";
import {
  createMessagesStore, defaultMessagesState, MessagesActions, MessagesStore, MessagesModel, MessagesState,
} from "./store";

export const alertEffects = (options?: {
  timeout?: number,
}) => (store: MessagesStore) => {
  const {timeout = 5000} = options || {};
  return store.action$
    .filter(a => a.type === MessagesActions.addMessages.type)
    .switchMap(a => {
      const messages = <MessagesModel[]> a.payload;
      const removeStreams = messages.map(m => {
        const stopCondition = store.action$
          .filter(a1 => a1 !== a)
          .filter(a1 => a1.type === MessagesActions.addMessages.type)
          .filter(a1 => (<MessagesModel[]> a1.payload).some(msg => msg.id === m.id));
        const removeAction = MessagesActions.removeById(m.id);
        // return Observable
        //   .interval(timeout, queue)
        //   .first()
        //   .takeUntil(stopCondition)
        //   .map(() => removeAction)
        //   .do(console.info);
        //   ;
        return Observable.of(removeAction)
          .takeUntil(stopCondition)
          .delay(timeout, queue);
      });
      // console.log("TIMEOUT IS ", timeout);
      // console.log("ACTIONS!!!: ", ...removeStreams);
      return Observable
        .merge(...removeStreams)
        .do(console.log);
    });
};
