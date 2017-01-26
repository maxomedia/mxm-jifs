<template lang="pug">
  div#app
    header
    main
      router-view
    footer
</template>

<script>
import store from 'config/store';
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
}
</script>

<style>
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
</style>
