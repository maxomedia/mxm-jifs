import Vue from 'vue';
import Router from 'vue-router';
import { auth } from 'config/firebase';

import Login from 'components/login';
import Register from 'components/register';
import CreatePost from 'components/create-post';
import Posts from 'components/posts';
import PostDetail from 'components/post-detail';

Vue.use(Router);

const router = new Router({
	base: '/',
	linkActiveClass: 'active',
	routes: [
		{
			path: '/posts',
			component: Posts,
			meta: {
				requiresAuth: false,
			}
		},
		{
			path: '/login',
			component: Login,
			meta: {
				requiresAuth: false,
			},
		},
		{
			path: '/register',
			component: Register,
			meta: {
				requiresAuth: false,
			},
		},
		{
			path: '/create',
			component: CreatePost,
			meta: {
				requiresAuth: true,
			},
		},
		{
			path: '/post/:id',
			component: PostDetail,
		},
	],
});

router.beforeEach((to, from, next) => {
	if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!auth.currentUser) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next() // make sure to always call next()!
  }
});

export default router;