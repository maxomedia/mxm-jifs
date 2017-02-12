<template lang="pug">
  div#app
    header
      router-link(to="/create") Create Post
      router-link(to="/posts") Posts
      router-link(to="/profile") Profile
      auth-guard
        div(slot="auth") Logged in as "{{user.displayName}}"
          button(@click="signOut") logout
        div(slot="no-auth")
          router-link(to="/login") login
    main
      router-view
    footer
</template>

<script>
import store from 'config/store';
import AuthGuard from 'components/auth-guard';
import { auth } from 'config/firebase';

export default {
  name: 'app',
  created() {

    // Listen to auth changes at firebase
    auth
      .onAuthStateChanged((user) => {
        this.isLoading = false;

        // Dispatch according to auth state
        if (user) {
          store.commit('LOGIN', {user});
        } else {
          store.commit('LOGOUT');
        }
      });
  },
  computed: {
    user() {return this.$store.state.auth.user},
  },
  methods: {
    signOut() {
      auth.signOut();
    }
  },
  components: {
    AuthGuard,
  }
}
</script>

<style lang="scss">
  html {
    height: 100%;
    font-size: 10px;
  }

  body {
    margin: 0;
    min-height: 100%;
    display: flex;
    flex-direction: column;
    background-color: #353535;
    font-family: 'Open Sans', sans-serif;
    color: white;
    font-size: 20px;
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

    & + a {
      margin-left: 1em;
    }
  }

  img {
    max-width: 100%;
  }
</style>
