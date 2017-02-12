<template lang="pug">
  div.create-comment
    textarea(v-model="comment" placeholder="new comment")
    button(@click="saveComment" v-bind:disabled="canComment") comment
    p.error(v-if="error") {{error}}
</template>

<script>
  import firebase from 'config/firebase';
  import Comment from 'models/comment';

  export default {
    data() {
      return {
        comment: '',
        error: false,
        loading: false,
      }
    },

    computed: {
      user() { return this.$store.state.auth.user; },
      canComment() { return this.loading || this.comment.length == 0; }
    },

    props: {
      post: Object,
    },

    methods: {
      saveComment() {
        var comment = new Comment({
          text: this.comment,
          user: this.user.getUserInfo(),
          post: this.post.id,
        });

        this.loading = true;
        return comment.set()
          .then(() => {
            this.loading = false;
            this.error = false;
            this.comment = '';
          })
          .catch(err => {
            this.loading = false;
            this.error = err.message;
          });
      },
    },
  }
</script>

<style lang="scss">
  
</style>