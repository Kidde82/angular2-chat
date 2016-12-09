import { User } from "./user";

export interface Message {
	id: string;
	timestamp: Date;
	user: User,
	content: string;
};
