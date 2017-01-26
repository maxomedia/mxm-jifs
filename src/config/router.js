import Vue from 'vue';
import Router from 'vue-router';

import Login from 'components/login';
import Register from 'components/register';
import CreatePost from 'components/create-post';

Vue.use(Router);

const router = new Router({
	base: '/',
	linkActiveClass: 'active',
	routes: [
		{
			path: '/login',
			component: Login,
		},
		{
			path: '/register',
			component: Register,
		},
		{
			path: '/create',
			component: CreatePost,
		}
	],
});

export default router;