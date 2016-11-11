import 'rxjs/add/operator/let';
import { ActionReducer } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { combineLatest } from 'rxjs/observable/combineLatest';
import { environment } from '../../environments/environment';

import { User } from "../models/user";

/**
 * The compose function is one of our most handy tools. In basic terms, you give
 * it any number of functions and it returns a function. This new function
 * takes a value and chains it through every composed function, returning
 * the output.
 *
 * More: https://drboolean.gitbooks.io/mostly-adequate-guide/content/ch5.html
 */
import { compose } from '@ngrx/core/compose';

/**
 * storeFreeze prevents state from being mutated. When mutation occurs, an
 * exception will be thrown. This is useful during development mode to
 * ensure that none of the reducers accidentally mutates the state.
 */
import { storeFreeze } from 'ngrx-store-freeze';

/**
 * combineReducers is another useful metareducer that takes a map of reducer
 * functions and creates a new reducer that stores the gathers the values
 * of each reducer and stores them using the reducer's key. Think of it
 * almost like a database, where every reducer is a table in the db.
 *
 * More: https://egghead.io/lessons/javascript-redux-implementing-combinereducers-from-scratch
 */
import { combineReducers } from '@ngrx/store';

import * as fromUsers from "./user.reducer";
import * as fromCollection from "./collection.reducer";

export interface State {
	users: fromUsers.State;
	collection: fromCollection.State;
}

const reducers = {
	user: fromUsers.reducer,
	collection: fromCollection.reducer
};

const developmentReducer: ActionReducer<State> = compose(storeFreeze, combineReducers)(reducers);
const productionReducer: ActionReducer<State> = combineReducers(reducers);

export function reducer(state: any, action: any) {
	if (environment.production) {
		return productionReducer(state, action);
	} else {
		return developmentReducer(state, action);
	}
}

export function getUsersState(state$: Observable<State>) {
	return state$.select(state => state.users);
}

export const getUserEntities = compose(fromUsers.getUserEntities, getUsersState);
export const getUserIds = compose(fromUsers.getUserIds, getUsersState);

export function getCollectionState(state$: Observable<State>) {
  return state$.select(s => s.collection);
}

export const getCollectionUserIds = compose(fromCollection.getUserIds, getCollectionState);

export const getUserCollection = function (state$: Observable<State>) {
	return combineLatest<{ [id: string]: User }, string[]>(
		state$.let(getUserEntities),
		state$.let(getCollectionUserIds)
	)
	.map(([ entities, ids ]) => ids.map(id => entities[id]));
}
