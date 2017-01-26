<template lang="pug">
  div.post
    div.post--image-container
      img.post--image(:src="post.images[0]")
    div.post--meta
      p.post--title {{post.title}}
      p.post--score Scored {{score}}pt
        auth-guard
          span(slot="auth") , 
            button(@click="upvote") upvote
            button(@click="downvote") downvote
          span(slot="no-auth")
</template>

<script>
  import Vue from 'vue';
  import AuthGuard from 'components/auth-guard';
  import { database } from 'config/firebase';

  export default {
    props: {
      post: Object,
    },

    computed: {
      score() {
        const upvotes = (this.post.upvotes) ? Object.keys(this.post.upvotes) : 0;
        const downvotes = (this.post.downvotes) ? Object.keys(this.post.downvotes) : 0;
        return upvotes - downvotes;
      },
      user() { return this.$store.state.auth.user; }
    },

    methods: {
      upvote() {
        var postref = `/posts/${this.post.uid}`;
        var updates = {};

        if (!this.post.upvotes) this.post.upvotes = {};
        if (this.post.upvotes[this.user.uid]) {
          updates[`${postref}/upvotes/${this.user.uid}`] = true;
        } else {
          updates[`${postref}/upvotes/${this.user.uid}`] = undefined;
        }
        
        database.ref(postref).update(updates);
      },
      downvote() {
        if (!this.post.downvotes) this.post.downvotes = {};
        if (this.post.downvotes[this.user.uid]) {
          Vue.delete(this.post.downvotes, this.user.uid);
        } else {
          Vue.set(this.post.downvotes, this.user.uid, true);
          if (this.post.upvotes && this.post.upvotes[this.user.uid]) this.upvote();
        }
      }
    },

    components: {
      AuthGuard,
    }
  }
</script>

<style lang="scss">
  .post {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex: 0 0 20%;
    padding: 15px;
  }

  .post--image-container {
    flex: 1 0 auto;
  }

  .post--image-container,
  .post--meta {
    background: rgba(255,255,255, 0.1);
  }

  .post--meta {
    padding: 15px;
  }

  .post--image {
    height: auto;
  }
</style>
