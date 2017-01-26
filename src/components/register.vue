<template lang="pug">
	div
		auth-guard
			div(slot="auth")
				h1 {{user.displayName}}, you're already logged in.
				p
					span To create another account, 
					button(@click="logout") logout
					span  first.
				p.error(v-if="error") {{error}}
			div(slot="no-auth")
				h1 welcome
				p
					span to you, 
					input(placeholder="new maxo" v-model="username")
					span . Enter a 
					input(placeholder="passphrase" v-model="password")
					span  and your 
					input(placeholder="email address" v-model="email")
					span  and you're good to 
					button(@click="createUser") go
				p.error(v-if="error") {{error}}
</template>

<script>
	import firebase from 'config/firebase';
	import router from 'config/router';
	import store from 'config/store';
	import AuthGuard from 'components/auth-guard';

	export default {
		data() {
			return {
				username: '',
				password: '',
				email: '',
				error: false,
			};
		},

		computed: {
			user: () => store.state.auth.user,
		},

		methods: {
			createUser() {
				firebase
					.auth()
					.createUserWithEmailAndPassword(this.email, this.password)
					.then(user => {
						this.error = false;
						this.password = '';
						this.email = '';
						return user.updateProfile({
							displayName: this.username,
						});
					})
					.then(() => {
						this.username = '';
						store.commit('UPDATE_PROFILE', {user: firebase.auth().currentUser});
						router.push('/');
					})
					.catch(err => {
						this.error = err.message;
					});
			},
			logout() {
				firebase
					.auth()
					.signOut();
			}
		},

		components: {
			AuthGuard,
		},
	};
</script>

<style>

</style>