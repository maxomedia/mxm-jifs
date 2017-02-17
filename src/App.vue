<template lang="pug">
  div#app
    header
        .container
            router-link(to="/create") Create Post
            router-link(to="/posts") Posts
            router-link(to="/profile") Profile
            auth-guard
                div(slot="auth") Logged in as "{{user.displayName || user.email}}"
                button(@click="signOut") logout
                div(slot="no-auth")
                router-link(to="/login") login
    main
        .container
            router-view
            styleguide
    footer
</template>

<script>
    import store from 'config/store';
    import AuthGuard from 'components/auth-guard';
    import Styleguide from 'components/styleguide';
    import {
        auth
    } from 'config/firebase';

    export default {
        name: 'app',
        created() {

            // Listen to auth changes at firebase
            auth
                .onAuthStateChanged((user) => {
                    this.isLoading = false;

                    // Dispatch according to auth state
                    if (user) {
                        store.commit('LOGIN', {
                            user
                        });
                    } else {
                        store.commit('LOGOUT');
                    }
                });
        },
        computed: {
            user() {
                return this.$store.state.auth.user
            },
        },
        methods: {
            signOut() {
                auth.signOut();
            }
        },
        components: {
            AuthGuard,
            Styleguide,
        }
    }
</script>

<style lang="scss">
    @import 'src/styles/_index';
</style>