<template lang="pug">
  div.post
    router-link.post--link(:to="postLink")
      div.post--image-container(v-if="post.images.length")
        img.post--image(:src="post.images[0]")
      div.post--meta.module
        h2.post--title {{post.title}}
        p.post--score Scored {{score}}pt
        p.post--user by {{post.user.displayName}}
</template>

<script>
    import Vue from 'vue';
    import sumScore from 'src/shared/score';

    export default {
        props: {
            post: Object,
        },

        computed: {
            score() {
                return sumScore(this.post.votes);
            },
            postLink() {
                return `/post/${this.post.id}`;
            },
        },
    }
</script>

<style lang="scss">
    .post {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        flex: 0 0 percentage(1/3);
        padding: 15px;
    }
    
    .post--link {
        display: flex;
        flex-direction: column;
        color: white;
        height: 100%;
    }
    
    .post--image-container {
        flex: 1 0 auto;
    }
    
    .post--image-container,
    .post--meta {
        background: rgba(255, 255, 255, 0.1);
    }
    
    .post--meta {
        padding: 15px;
    }
    
    .post--image {
        height: auto;
    }
</style>