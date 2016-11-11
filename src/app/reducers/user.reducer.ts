import '@ngrx/core/add/operator/select';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/let';
import { Observable } from 'rxjs/Observable';
import { combineLatest } from 'rxjs/observable/combineLatest';

import * as user from '../actions/user.action';
import * as collection from '../actions/collection.action';
import { User } from "../models";

export interface State {
	ids: string[];
	entities: { [id: string]: User };
};

const initialState: State = {
	ids: [],
	entities: {}
};

export function reducer(state = initialState, action: user.Actions | collection.Actions): State {
	switch (action.type) {
		case user.ActionTypes.LOAD: {
			const user = action.payload;

			if (state.ids.indexOf(user.id) > -1) {
				return state;
			}

			return {
				ids: [ ...state.ids, user.id ],
				entities: Object.assign({}, state.entities, {
					[user.id]: user
				})
			};
		}

		default: {
			return state;
		}
	}
}

export function getUserEntities(state$: Observable<State>) {
	return state$.select(state => state.entities);
}

export function getUserIds(state$: Observable<State>) {
	return state$.select(state => state.ids);
}

export function getAllUsers(state$: Observable<State>) {
	return combineLatest<{ [id: string]: User }, string[]>(
		state$.let(getUserEntities),
		state$.let(getUserIds)
	)
	.map(([ entities, ids ]) => ids.map(id => entities[id]));
}
