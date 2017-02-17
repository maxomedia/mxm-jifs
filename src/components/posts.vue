<template lang="pug">
  div.posts
    auth-guard
      create-post(slot="auth")
      login(slot="no-auth")
    post-view(v-for="post in posts" v-bind:post="post")
</template>

<script>
    import Post from 'models/post';
    import PostView from 'components/post';
    import {
        database
    } from 'config/firebase';
    import CreatePost from 'components/create-post';
    import AuthGuard from 'components/auth-guard';
    import Login from 'components/login';

    export default {
        computed: {
            posts() {
                return this.firePosts.map(post => new Post(post));
            }
        },

        firebase: {
            firePosts: database.ref('/posts'),
        },

        components: {
            PostView,
            CreatePost,
            AuthGuard,
            Login,
        }
    }
</script>

<style lang="scss">
    .posts {
        display: flex;
        flex-wrap: wrap;
    }
</style>