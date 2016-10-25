module.exports=function(e){function r(n){if(t[n])return t[n].exports;var s=t[n]={i:n,l:!1,exports:{}};return e[n].call(s.exports,s,s.exports,r),s.l=!0,s.exports}var t={};return r.m=e,r.c=t,r.i=function(e){return e},r.d=function(e,r,t){Object.defineProperty(e,r,{configurable:!1,enumerable:!0,get:t})},r.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,r){return Object.prototype.hasOwnProperty.call(e,r)},r.p="",r(r.s=20)}([function(e,r,t){"use strict";t(2),t(1),t(4),t(5),t(6),t(10),t(8),t(7),t(9),t(3),t(11);var n=t(19),s=n.actionCreator("MantTest.Messages/");r.MessagesActions={addMessages:s.of("ADD_MESSAGES",function(e,r){var t=e.messages.map(function(e){return r.filter(function(r){return r.id===e.id})[0]||e}).concat(r.filter(function(r){return!e.messages.some(function(e){return r.id===e.id})})).sort(e.compare);return n.reassign(e,{messages:t})}),cleanMessages:s("CLEAN_MESSAGES",function(e){return n.reassign(e,{messages:e.messages.filter(function(r){return!e.canClean(r)})})}),removeAll:s("REMOVE_ALL",function(e){return n.reassign(e,{messages:[]})}),removeById:s.of("REMOVE_BY_ID",function(e,r){return n.reassign(e,{messages:e.messages.filter(function(e){return e.id!==r})})})};var o=n.reducerFromActions(r.MessagesActions);r.defaultMessagesState=function(e,r){return{messages:[],canClean:e||function(){return!0},compare:r||function(){return-1}}},r.createMessagesStore=function(e,t){return n.defineStore(o,r.defaultMessagesState,n.extendWithActions(r.MessagesActions))}},function(e,r){e.exports=require("rxjs/add/observable/merge")},function(e,r){e.exports=require("rxjs/add/observable/of")},function(e,r){e.exports=require("rxjs/add/operator/debounceTime")},function(e,r){e.exports=require("rxjs/add/operator/distinctUntilChanged")},function(e,r){e.exports=require("rxjs/add/operator/filter")},function(e,r){e.exports=require("rxjs/add/operator/map")},function(e,r){e.exports=require("rxjs/add/operator/observeOn")},function(e,r){e.exports=require("rxjs/add/operator/startWith")},function(e,r){e.exports=require("rxjs/add/operator/subscribeOn")},function(e,r){e.exports=require("rxjs/add/operator/switchMap")},function(e,r){e.exports=require("rxjs/add/operator/timeout")},function(e,r,t){"use strict";function n(e){for(var t in e)r.hasOwnProperty(t)||(r[t]=e[t])}n(t(0)),n(t(13))},function(e,r,t){"use strict";function n(e){if(Array.isArray(e)){for(var r=0,t=Array(e.length);r<e.length;r++)t[r]=e[r];return t}return Array.from(e)}var s=t(14);t(2),t(15),t(1),t(4),t(5),t(6),t(10),t(8),t(7),t(9),t(3),t(11),t(16),t(18),t(17);var o=t(0);r.alertEffects=function(e){return function(r){var t=e||{},i=t.timeout,a=void 0===i?5e3:i;return r.action$.filter(function(e){return e.type===o.MessagesActions.addMessages.type}).switchMap(function(e){var t,i=e.payload,u=i.map(function(t){var n=r.action$.filter(function(r){return r!==e}).filter(function(e){return e.type===o.MessagesActions.addMessages.type}).filter(function(e){return e.payload.some(function(e){return e.id===t.id})}),i=o.MessagesActions.removeById(t.id);return s.Observable.of(i).takeUntil(n).delay(a)});return(t=s.Observable).merge.apply(t,n(u))})}}},function(e,r){e.exports=require("rxjs/Observable")},function(e,r){e.exports=require("rxjs/add/observable/interval")},function(e,r){e.exports=require("rxjs/add/operator/delay")},function(e,r){e.exports=require("rxjs/add/operator/do")},function(e,r){e.exports=require("rxjs/add/operator/takeUntil")},function(e,r){e.exports=require("rxstore")},function(e,r,t){"use strict";function n(e){for(var t in e)r.hasOwnProperty(t)||(r[t]=e[t])}n(t(12))}]);