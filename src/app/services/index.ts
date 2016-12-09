import { UserService } from "./user.service";
import { MessageService } from "./message.service";
import { SessionStorageService } from "./session-storage.service";

export {
	UserService,
	MessageService,
	SessionStorageService
}

export default [
	UserService,
	MessageService,
	SessionStorageService
];
