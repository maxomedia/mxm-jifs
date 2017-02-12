<template lang="pug">
  div.post-detail
    h1 {{post.title}}
    p
      img.post-detail--image(v-for="image in post.images" v-bind:src="image")
    auth-guard
      div(slot="auth")
        create-comment(v-bind:post="post")
    comments
</template>

<script>
  import AuthGuard from 'components/auth-guard';
  import CreateComment from 'components/create-comment';
  import Comments from 'components/comments';
  import { database } from 'config/firebase';
  import router from 'config/router';

	export default {
    created() {
      this.$bindAsObject('post', database.ref(`/posts/${this.$route.params.id}`));
    },

    components: {
      CreateComment,
      AuthGuard,
      Comments,
    },
	};
</script>

<style lang="scss">
  .post-detail--image {
    max-width: 600px;
  }
</style>