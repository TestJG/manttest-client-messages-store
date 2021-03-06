// Generated by dts-bundle v0.5.0
// Dependencies for this module:
//   ../rxstore
//   ../rxjs/Observable

declare module 'manttest-client-messages-store' {
	export * from "manttest-client-messages-store/index";
}

declare module 'manttest-client-messages-store/index' {
	export * from "manttest-client-messages-store/store";
	export * from "manttest-client-messages-store/effects";
}

declare module 'manttest-client-messages-store/store' {
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
	import { TypedActionDescription, EmptyActionDescription, Store, ICreateStoreOptions } from "rxstore";
	export interface MessagesModel {
		id: string;
	}
	export interface MessagesState {
		messages: MessagesModel[];
		canClean: (m: MessagesModel) => boolean;
		compare: (m1: MessagesModel, m2: MessagesModel) => number;
	}
	export interface MessagesEvents {
	}
	export const MessagesActions: {
		addMessages: TypedActionDescription<MessagesState, MessagesModel[]>;
		cleanMessages: EmptyActionDescription<MessagesState>;
		removeAll: EmptyActionDescription<MessagesState>;
		removeById: TypedActionDescription<MessagesState, string>;
	};
	export type MessagesStore = Store<MessagesState> & MessagesEvents;
	export const defaultMessagesState: (canClean?: ((m: MessagesModel) => boolean) | undefined, compare?: ((m1: MessagesModel, m2: MessagesModel) => number) | undefined) => MessagesState;
	export const createMessagesStore: (canClean?: ((m: MessagesModel) => boolean) | undefined, compare?: ((m1: MessagesModel, m2: MessagesModel) => number) | undefined) => (options?: ICreateStoreOptions<MessagesState> | undefined) => MessagesStore;
}

declare module 'manttest-client-messages-store/effects' {
	import { Observable } from "rxjs/Observable";
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
	import { Action } from "rxstore";
	import { MessagesStore } from "manttest-client-messages-store/store";
	export const alertEffects: (options?: {
		timeout?: number | undefined;
	} | undefined) => (store: MessagesStore) => Observable<Action>;
}

