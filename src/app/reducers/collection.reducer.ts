import '@ngrx/core/add/operator/select';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import * as collection from '../actions/collection.action';
import { User } from "../models";

export interface State {
	loaded: boolean;
	loading: boolean;
	ids: string[];
};

const initialState: State = {
	loaded: false,
	loading: false,
	ids: []
};

export function reducer(state = initialState, action: collection.Actions): State {
	switch (action.type) {
		case collection.ActionTypes.LOAD: {
			return Object.assign({}, state, {
				loading: true
			});
		}

		case collection.ActionTypes.LOAD_SUCCESS: {
			const users = action.payload;

			return {
				loaded: true,
				loading: false,
				ids: users.map(user => user.id)
			}
		}

		case collection.ActionTypes.ADD_USER_SUCCESS:
		case collection.ActionTypes.REMOVE_USER_FAIL: {
			const user = action.payload;

			if (state.ids.indexOf(user.id) > -1) {
				return state;
			}

			return Object.assign({}, state, {
				ids: [ ...state.ids, user.id ]
			});
		}

		case collection.ActionTypes.REMOVE_USER_SUCCESS:
		case collection.ActionTypes.ADD_USER_FAIL: {
			const user = action.payload;

			return Object.assign({}, state, {
				ids: state.ids.filter(id => id !== user.id)
			});
		}

		default: {
			return state;
		}

	}
}

export function getUserIds(state$: Observable<State>) {
	return state$.select(s => s.ids);
}
