import { Routes } from '@angular/router';
import { About } from './about/about';
import { Chat } from './containers/chat/chat';
import { RepoBrowser } from './github/repo-browser/repo-browser';
import { RepoList } from './github/repo-list/repo-list';
import { RepoDetail } from './github/repo-detail/repo-detail';

export const rootRouterConfig: Routes = [
	{ path: '', redirectTo: 'chat', pathMatch: 'full' },
	{ path: 'chat', component: Chat },
	{ path: 'about', component: About },
	{
		path: 'github', component: RepoBrowser,
		children: [
			{ path: '', component: RepoList },
			{
				path: ':org', component: RepoList,
				children: [
					{ path: '', component: RepoDetail },
					{ path: ':repo', component: RepoDetail }
				]
			}]
	}
];

