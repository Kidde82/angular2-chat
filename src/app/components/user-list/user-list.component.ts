import 'rxjs/add/operator/let';
import { Component, Input } from "@angular/core";
import { Store } from '@ngrx/store';
import { Observable } from "rxjs/Observable";

import * as fromRoot from '../../reducers';
import { User } from "../../models";

@Component({
	selector: "user-list",
	templateUrl: "./user-list.component.html"
})
export class UserListComponent {
	@Input() users: User[];
}
