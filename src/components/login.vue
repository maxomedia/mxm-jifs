<template lang="pug">
	div.login-view
		auth-guard
			div(slot="auth")
				h1 You are already logged in...
				button(@click="logout") logout
			div(slot="no-auth")
				button(@click="login") Log in with google
				p.error(v-if="error") {{error}}
</template>

<script>
    import {
        auth,
        GoogleProvider
    } from 'config/firebase';
    import router from 'config/router';
    import AuthGuard from 'components/auth-guard';

    export default {
        data() {
            return {
                email: '',
                password: '',
                error: false,
                loading: false,
            };
        },

        methods: {
            login() {
                this.loading = true;

                auth
                    .signInWithPopup(GoogleProvider)
                    .then(user => {
                        this.loading = false;
                        this.error = false;
                        router.push('/');
                    })
                    .catch(err => {
                        this.loading = false;
                        this.error = err;
                    });
            },
            logout() {
                auth.signOut();
            }
        },

        components: {
            AuthGuard,
        }
    }
</script>

<style>

</style>