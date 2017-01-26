<template lang="pug">
	div.login-view
		auth-guard
			div(slot="auth")
				h1 You are already logged in...
				button(@click="logout") logout
			div(slot="no-auth")
				h1 LOGIN,
				p
					span dear 
					input(placeholder="maxo (email)" v-model="email")
					span , your password was 
					input(placeholder="this one" v-model="password")
					span , right? Let's 
					button(@click="login") rock.
				p.error(v-if="error") {{error}}
</template>

<script>
	import firebase from 'config/firebase';
	import router from 'config/router';
	import AuthGuard from 'components/auth-guard';

	export default {
		data() {
			return {
				email: '',
				password: '',
				error: false,
			};
		},

		methods: {
			login() {
				firebase
					.auth()
					.signInWithEmailAndPassword(this.email, this.password)
					.then(user => {
						this.error = false;
						router.push('/');
					})
					.catch(err => {
						this.error = err;
					})
			},
			logout() {
				firebase
					.auth()
					.signOut();
			}
		},

		components: {
			AuthGuard,
		}
	}
</script>

<style>

</style>