import { Reducer, combineReducers } from "redux";
import { UsersState, UsersReducer } from "./user.reducer";
export * from "./user.reducer";

export interface AppState {
	users: UsersState
}

const rootReducer: Reducer<AppState> = combineReducers<AppState>({
	users: UsersReducer
});

export default rootReducer;
