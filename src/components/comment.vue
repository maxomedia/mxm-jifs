<template lang="pug">
  li.comment
    p {{comment.text}}
    p
      span.smaller by 
        router-link(:to="profileLink") {{comment.user.displayName}}
      span , scored {{score}} points
      button.comment--delete(v-if="comment.user.uid == user.uid" @click="comment.remove") delete
      button(@click="comment.upvote(user.uid)") upvote
      button(@click="comment.downvote(user.uid)") downvote
</template>

<script>
    import sumScore from 'src/shared/score';

    export default {
        props: {
            comment: Object,
        },

        computed: {
            profileLink() {
                return `/profile/${this.comment.user.uid}`;
            },
            user() {
                return this.$store.state.auth.user;
            },
            score() {
                return sumScore(this.comment.votes);
            }
        }
    };
</script>

<style lang="scss">
    .comment {
        margin: 1em 0;
        padding: 0.5em;
        background: rgba(255, 255, 255, 0.15);
        p {
            margin: 0;
        }
    }
</style>