<template lang="pug">
  ul.comments
    comment-view(:comment="comment" v-for="comment in comments")
</template>

<script>
  import { database } from 'config/firebase';
  import CommentView from 'components/comment';
  import Comment from 'models/comment';

  export default {
    computed: {
      comments() { return this.fireComments.map(comment => new Comment(comment)); },
    },

    created() {
      this.$bindAsArray('fireComments', database
        .ref('/comments')
        .orderByChild('post')
        .equalTo(this.$route.params.id)
      );
    },

    components: {
      CommentView,
    }
  };
</script>

<style lang="scss">
  .comments {
    list-style: none; 
    padding-left: 0;
  }
</style>