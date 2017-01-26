<template lang="pug">
  div.posts
    post-view(v-for="post in posts" v-bind:post="post")
</template>

<script>

  import PostView from 'components/post';
  import { database } from 'config/firebase';

  export default {
    firebase: {
      posts: database.ref('/posts'),
    },

    components: {
      PostView,
    }
  }
</script>

<style lang="scss">
  .posts {
    display: flex;
    flex-wrap: wrap;
  }
</style>