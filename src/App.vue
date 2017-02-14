<template lang="pug">
  div#app
    header
      router-link(to="/create") Create Post
      router-link(to="/posts") Posts
      router-link(to="/profile") Profile
      auth-guard
        div(slot="auth") Logged in as "{{user.displayName || user.email}}"
          button(@click="signOut") logout
        div(slot="no-auth")
          router-link(to="/login") login
    main
      styleguide
      router-view
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
    @import 'src/sass/text';
    html {
        height: 100%;
    }
    
    body {
        margin: 0;
        min-height: 100%;
        display: flex;
        flex-direction: column;
        background-color: #353535;
        color: white;
    }
    
    main {
        flex-grow: 1;
    }
    
    a {
        display: inline-block;
        color: lightblue;
        text-decoration: none;
        &.active {
            text-decoration: underline;
        }
        &+a {
            margin-left: 1em;
        }
    }
    
    img {
        max-width: 100%;
    }
</style>