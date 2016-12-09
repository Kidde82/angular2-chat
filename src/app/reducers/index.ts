import "@ngrx/core/add/operator/select";
import { compose } from "@ngrx/core/compose";
import { combineReducers } from "@ngrx/store";
import { storeLogger } from "ngrx-store-logger";

import userListReducer, * as fromUserList from "./user-list";
import userReducer, * as fromUser from "./user";

export interface AppState {
	users: fromUserList.UserListState,
	user: fromUser.UserState
};

export default compose(storeLogger(), combineReducers)({
	users: userListReducer,
	user: userReducer
});
