import { Routes } from "@angular/router";

import { Chat } from "./containers/chat/chat";

export const rootRouterConfig: Routes = [
	{ path: "", redirectTo: "chat", pathMatch: "full" },
	{ path: "chat", component: Chat }
];
