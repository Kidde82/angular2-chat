import { Injectable } from "@angular/core";

@Injectable()
export class LocalStorageService {
	write(path: string, value: string): void {
		localStorage.setItem(path, value);
	}

	writeObject(path: string, data: any): void {
		let value: string = JSON.stringify(data);
		this.write(path, value);
	}

	read(path: string): any {
		let value: string = localStorage.getItem(path);
		if (!value) {
			return null;
		} else {
			return value;
		}
	}

	readObject<T>(path: string): T {
		let value: any = this.read(path);
		let data: T;

		try {
			data = <T>JSON.parse(value);
		} catch (error) {
			data = null;
		}

		return data;
	}

	remove(path: string): void {
		localStorage.removeItem(path);
	}
}
